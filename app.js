const express = require('express')
const fs = require('fs')
const { isBlank, validateAccount, validateAccountType, validateAccountCloseDate, isBalance, isMailAndSecretMatch, inWhiteList } = require('./js/validate')
const { getValidAccountLike, getAllValidAcount, getAllAccounts, addAccount, addAccountType, closeAccount, balanceAccount, getAllAcountTypes } = require('./js/account_service')
const { addEntry, addTransactionTemplate, getTransactionTemplate, deleteTransactionTemplate, getLatest100Payee, listItemByCondition, execCmd } = require('./js/api')
const { getLedgerList, newLedger } = require('./js/ledger')
const { statsTotalAmount, statsSubAccountPercent, statsAccountTrend, statsLedgerMonths, statsPayee, statsMonthIncomeExpenses } = require('./js/stats')
const { dirFile, readFile, writeFile } = require('./js/source_file')
const { json } = require('express')
const Cache = require('./js/cache')
const { ignoreInvalidCharAndBlank, ignoreInvalidChar, getAccountType, getAllDirFiles, log } = require('./js/utils')
const { getLedgerConfigFilePath } = require('./js/path')
const dayjs = require('dayjs')
const multer = require('multer')
const { initLedgerStructure, initAccountCache } = require('./js/init');
const path = require('path')

const ok = data => ({ code: 200, data })
const badRequest = () => ({ code: 400 })
const error = code => ({ code })

const app = express()
const router = express.Router();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router);

const registerRoute = (router, Config) => {
  const upload = multer({ dest: `${Config.dataPath}/icon-tmp/` });
  // 统一处理 ledgerId
  router.all('/auth/**', function (req, res, next) {
    const ledgerId = req.header('ledgerId')
    if (isBlank(ledgerId)) {
      return res.json(error(1010))
    }
    const ledgerConfig = Cache.LedgerConfig[ledgerId]
    if (!ledgerConfig) {
      return res.json(error(1010))
    }
    req.ledgerConfig = ledgerConfig
    next()
  })

  router.get('/ledger', function (req, res) {
    res.json(ok(getLedgerList()))
  })

  router.post('/ledger', function (req, res) {
    const { mail, secret } = req.body
    if (isBlank(mail)) {
      res.json(badRequest())
    } else if (!inWhiteList(mail)) {
      res.json(error(1006))
    } else if (!isMailAndSecretMatch(mail, secret)) {
      res.json(error(1006))
    } else {
      res.json(ok(newLedger(req.body)))
    }
  })

  router.get('/auth/account/init', function (req, res) {
    initAccountCache(req.ledgerConfig);
    res.json(ok())
  })

  // 查询可用的账户
  router.get('/auth/account/valid', function (req, res) {
    const key = req.query.key;
    if (isBlank(key)) {
      res.json(ok(getAllValidAcount(req.ledgerConfig)))
    } else {
      res.json(ok(getValidAccountLike(req.ledgerConfig, key)))
    }
  })

  // 模糊查询账户
  router.get('/auth/account/all', function (req, res) {
    res.json(ok(getAllAccounts(req.ledgerConfig)))
  })

  // 查询账户类型
  router.get('/auth/account/type', function (req, res) {
    res.json(ok(getAllAcountTypes(req.ledgerConfig, req.query.cata)))
  })

  // 新增账户类型
  router.post('/auth/account/type', function (req, res) {
    const name = req.query.name;
    const type = ignoreInvalidCharAndBlank(req.query.type)
    if (!validateAccountType(type)) {
      // 无效账户
      res.json(error(1003))
    } else if (isBlank(type) || isBlank(name)) {
      res.json(badRequest())
    } else {
      res.json(ok(addAccountType(req.ledgerConfig, type, name)))
    }
  })

  // 新增账户
  router.post('/auth/account', function (req, res) {
    const date = req.query.date;
    const account = ignoreInvalidCharAndBlank(req.query.account)
    const commodity = ignoreInvalidCharAndBlank(req.query.commodity)
    if (!validateAccount(req.ledgerConfig, account)) {
      // 无效账户
      res.json(error(1003))
    } else if (isBlank(account) || isBlank(date) || isBlank(commodity)) {
      res.json(badRequest())
    } else {
      res.json(ok(addAccount(req.ledgerConfig, account, commodity, date)))
    }
  })

  // 关闭账户
  router.post('/auth/account/close', function (req, res) {
    const { account, date } = req.query;
    if (isBlank(account) || isBlank(date)) {
      res.json(badRequest())
    } else if (!validateAccountCloseDate(req.ledgerConfig, account, date)) {
      // 结束时间不合法
      return json(error(1002))
    } else {
      res.json(ok(closeAccount(req.ledgerConfig, account, date)))
    }
  })

  router.post('/auth/account/icon', upload.single('file'), function (req, res) {
    let ext = ''
    const extArr = req.file.originalname.split('.')
    if (extArr && extArr.length === 2) {
      ext = '.' + extArr[1]
    }
    var file = './public/icons/' + getAccountType(req.query.account) + ext;
    fs.copyFile(req.file.path, file, function (err) {
      if (err) {
        console.log(err);
        res.status(500).json(error());
      } else {
        res.json({
          filename: file
        });
      }
    });
  })

  // 关闭账户
  router.post('/auth/account/balance', function (req, res) {
    const { account, amount } = req.query;
    if (isBlank(account) || isBlank(amount) || !validateAccount(req.ledgerConfig, account)) {
      res.json(badRequest())
    } else {
      res.json(ok(balanceAccount(req.ledgerConfig, account, dayjs().format('YYYY-MM-DD'), amount)))
    }
  })

  // 查询最近100个商户
  router.get('/auth/payee', function (req, res) {
    res.json(ok(getLatest100Payee(req.ledgerConfig)))
  })

  // 记账
  router.post('/auth/entry', function (req, res) {
    const entry = req.body;
    entry.payee = ignoreInvalidCharAndBlank(req.body.payee)
    entry.desc = ignoreInvalidChar(req.body.desc)
    if (!entry || isBlank(entry.date) || isBlank(entry.desc) || !entry.entries) {
      res.json(badRequest())
    } else if (!isBalance(entry.entries)) {
      // 1001 账单不平衡
      res.json(error(1001))
    } else {
      res.json(ok(addEntry(req.ledgerConfig, entry)))
    }
  })

  // 查询账单
  router.get('/auth/entry', function (req, res) {
    const { type, year, month } = req.query;
    if (isBlank(type)) {
      res.json(badRequest())
    } else {
      res.json(ok(listItemByCondition(req.ledgerConfig, { type, year, month })))
    }
  })

  // 查询记账模版
  router.get('/auth/transaction/template', function (req, res) {
    res.json(ok(getTransactionTemplate(req.ledgerConfig)))
  })

  // 新增记账模版
  router.post('/auth/transaction/template', function (req, res) {
    const template = req.body;
    if (!template) {
      return res.json(badRequest())
    }
    res.json(ok(addTransactionTemplate(req.ledgerConfig, template)))
  })

  router.delete('/auth/transaction/template', function (req, res) {
    const templateId = req.query.id
    if (isBlank(templateId)) {
      return res.json(badRequest())
    }
    res.json(ok(deleteTransactionTemplate(req.ledgerConfig, templateId)))
  })

  // 读取文件列表
  router.get('/auth/file/dir', function (req, res) {
    res.json(ok(dirFile(req.ledgerConfig)))
  })

  // 读取文件内容
  router.get('/auth/file/content', function (req, res) {
    const { path } = req.query;
    res.json(ok(readFile(req.ledgerConfig, path)))
  })

  // 保存文件内容
  router.post('/auth/file', function (req, res) {
    const { path, content } = req.body;
    res.json(ok(writeFile(req.ledgerConfig, path, content)))
  })

  // 统计总资产
  router.get('/auth/stats/total', function (req, res) {
    const { year, month } = req.query;
    res.json(ok(statsTotalAmount(req.ledgerConfig, year, month)))
  })

  // 统计最近当前月的消费金额
  router.get('/auth/stats/exec', function (req, res) {
    const { cmd } = req.query;
    if (isBlank(cmd)) {
      res.json(badRequest())
    } else if (['bean-query', 'bean-report'].indexOf(cmd.split(/\s+/)[0])) {
      // 无效的命令
      res.json(error(1005))
    } else {
      res.json(ok(execCmd(cmd)))
    }
  })

  // 统计所有记账的月份
  router.get('/auth/stats/months', function (req, res) {
    res.json(ok(statsLedgerMonths(req.ledgerConfig)))
  })

  // 统计账户子类占比分布
  router.get('/auth/stats/account/percent', function (req, res) {
    if (isBlank(req.query.prefix)) {
      return res.json(badRequest())
    }
    const { prefix, year, month, level } = req.query
    res.json(ok(statsSubAccountPercent(req.ledgerConfig, prefix, year, month, level)))
  })

  // 统计账户一段时间的变化趋势
  router.get('/auth/stats/account/trend', function (req, res) {
    if (isBlank(req.query.prefix)) {
      return res.json(badRequest())
    }
    const { prefix, year, month, type } = req.query
    res.json(ok(statsAccountTrend(req.ledgerConfig, prefix, year, month, type)))
  })

  // 统计payee
  router.get('/auth/stats/payee', function (req, res) {
    if (isBlank(req.query.prefix)) {
      return res.json(badRequest())
    }
    const { prefix, year, month, type } = req.query
    res.json(ok(statsPayee(req.ledgerConfig, prefix, year, month, type)))
  })

  // 按月统计收支
  router.get('/auth/stats/month/incomeExpenses', function (req, res) {
    res.json(ok(statsMonthIncomeExpenses(req.ledgerConfig)))
  })
}

const BeancountNsApp = (Config, port) => {
  // 文件不存在，自动创建
  if (!fs.existsSync(Config.dataPath)) {
    fs.mkdirSync(Config.dataPath, { recursive: true })
  }
  // 初始化账本
  const ledgerConfigFilePath = getLedgerConfigFilePath(Config.dataPath)
  if (fs.existsSync(ledgerConfigFilePath)) {
    Cache.LedgerConfig = JSON.parse(fs.readFileSync(ledgerConfigFilePath))
    log(null, 'Success init cache: [ledger config]')
  } else {
    Cache.LedgerConfig = {}
    fs.writeFileSync(ledgerConfigFilePath, '{}')
    log(null, 'Success create file: ' + ledgerConfigFilePath)
    log(null, 'Success init cache: [ledger config]')
  }

  const { dirs, files } = getAllDirFiles(path.join(__dirname, 'example'))
  Object.values(Cache.LedgerConfig).forEach(config => {
    // 初始化 beancount 账本文件结构
    initLedgerStructure(config, './example', dirs, files);
    // 初始化 account 和 accountType 缓存
    initAccountCache(config);
  })

  registerRoute(router, Config);

  app.listen(port, '0.0.0.0', () => {
    console.log(`Beancount node server listening at http://localhost:${port}`)
  })
}

module.exports = BeancountNsApp