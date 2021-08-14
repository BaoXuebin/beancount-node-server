const express = require('express')
const { isBlank, validateAccount, validateAccountCloseDate, isBalance, isMailAndSecretMatch } = require('./js/validate')
const { initAccountCache, initAllLedgerAccountCache, getValidAccountLike, getAllValidAcount, getAllAccounts, addAccount, closeAccount, getAllAcountTypes } = require('./js/account_service')
const { addEntry, getLatest100Payee, listItemByCondition, execCmd } = require('./js/api')
const { getLedgerList, newLedger, initLedgerCache } = require('./js/ledger')
const { statsTotalAmount } = require('./js/stats')
const { json } = require('express')
const Cache = require('./js/cache')
const { ignoreInvalidCharAndBlank, ignoreInvalidChar } = require('./js/utils')

const app = express()
const port = 3001
const ok = data => ({ code: 200, data })
const badRequest = () => ({ code: 400 })
const error = code => ({ code })

const router = express.Router();

app.use(express.json())
app.use(express.static('public'))
app.use('/api', router);
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

// 模糊查询账户
router.get('/auth/account/type', function (req, res) {
  res.json(ok(getAllAcountTypes(req.query.cata)))
})

// 新增账户
router.post('/auth/account', function (req, res) {
  const date = req.query.date;
  const account = ignoreInvalidCharAndBlank(req.query.account)
  if (!validateAccount(req.ledgerConfig, account)) {
    // 无效账户
    res.json(error(1003))
  } else if (isBlank(account) || isBlank(date)) {
    res.json(badRequest())
  } else {
    res.json(ok(addAccount(req.ledgerConfig, account, date)))
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

// 查询最近100个商户
router.get('/auth/payee', function (req, res) {
  res.json(ok(getLatest100Payee(req.ledgerConfig)))
})


// 记账
router.post('/auth/entry', function (req, res) {
  const entry = req.body;
  entry.payee = ignoreInvalidCharAndBlank(req.body.payee)
  entry.desc = ignoreInvalidChar(req.body.payee)

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

app.listen(port, () => {
  initLedgerCache();
  initAllLedgerAccountCache();
  console.log(`Example app listening at http://localhost:${port}`)
})