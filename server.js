const express = require('express')
const { isBlank, validateAccount, validateAccountCloseDate, isBalance } = require('./js/validate')
const { initAccount, getValidAccountLike, getAllValidAcount, getAllAccounts, addAccount, closeAccount, getAllAcountTypes } = require('./js/account_service')
const { addEntry, statsMonth, listItemByCondition } = require('./js/api')
const { json } = require('express')

const app = express()
const port = 3001

const router = express.Router();

app.use(express.json())
app.use(express.static('public'))
app.use('/api', router);

const ok = data => ({ code: 200, data })
const badRequest = () => ({ code: 400 })
const error = code => ({ code })

// 查询可用的账户
router.get('/account/valid', function (req, res) {
  const key = req.query.key;
  if (isBlank(key)) {
    res.json(ok(getAllValidAcount()))
  } else {
    res.json(ok(getValidAccountLike(key)))
  }
})

// 模糊查询账户
router.get('/account/all', function (req, res) {
  res.json(ok(getAllAccounts()))
})

// 模糊查询账户
router.get('/account/type', function (req, res) {
  res.json(ok(getAllAcountTypes(req.query.cata)))
})


// 新增账户
router.post('/account', function (req, res) {
  const { account, date } = req.query;
  if (!validateAccount(account)) {
    // 无效账户
    res.json(error(1003))
  } else if (isBlank(account) || isBlank(date)) {
    res.json(badRequest())
  } else {
    res.json(ok(addAccount(account, date)))
  }
})

// 关闭账户
router.post('/account/close', function (req, res) {
  const { account, date } = req.query;
  if (isBlank(account) || isBlank(date)) {
    res.json(badRequest())
  } else if (!validateAccountCloseDate(account, date)) {
    // 结束时间不合法
    return json(error(1002))
  } else {
    res.json(ok(closeAccount(account, date)))
  }
})

// 恢复账户
router.post('/account/recover', function (req, res) {
  const { account, date } = req.query;
  if (!validateAccount(account)) {
    // 账户不存在
    res.json(error(1004))
  } else if (isBlank(account) || isBlank(date)) {
    res.json(badRequest())
  } else {
    res.json(ok(addAccount(account, date)))
  }
})

// 记账
router.post('/entry', function (req, res) {
  const entry = req.body;
  if (!entry || isBlank(entry.date) || isBlank(entry.desc) || !entry.entries) {
    res.json(badRequest())
  } else if (!isBalance(entry.entries)) {
    // 1001 账单不平衡
    res.json(error(1001))
  } else {
    res.json(ok(addEntry(entry)))
  }
})

// 查询账单
router.get('/entry', function (req, res) {
  const { type, year, month } = req.query;
  if (isBlank(type)) {
    res.json(badRequest())
  } else {
    res.json(ok(listItemByCondition({ type, year, month })))
  }
})

// 统计最近当前月的消费金额
router.get('/month/stats', function (req, res) {
  const { year, month } = req.query;
  res.json(ok(statsMonth(year, month)))
})

app.listen(port, () => {
  // 初始化 account
  initAccount()
  console.log(`Example app listening at http://localhost:${port}`)
})