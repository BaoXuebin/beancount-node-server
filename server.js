const express = require('express')
const { isBlank, validateAccountType, isBalance } = require('./js/validate')
const { initAccount, getAccountLike, addAccount, addEntry, statsMonth } = require('./js/api')
const dayjs = require('dayjs')

// 初始化 account
initAccount()

const app = express()
const port = 3000

app.use(express.json())

const ok = data => ({ code: 200, data })
const badRequest = () => ({ code: 400 })
const error = code => ({ code })

// 模糊查询账户
app.get('/account', function (req, res) {
  const key = req.query.key;
  if (isBlank(key)) {
    res.json(ok())
  } else {
    res.json(ok(getAccountLike(key)))
  }
})

// 新增账户
app.post('/account', function (req, res) {
  const account = req.body;
  type = validateAccountType(account.type)
  if (!type || isBlank(account.date) || isBlank(account.value)) {
    res.json(badRequest())
  } else {
    res.json(ok(addAccount(account)))
  }
})

// 记账
app.post('/entry', function (req, res) {
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

// 统计最近当前月的消费金额
app.get('/month/stats', function(req, res) {
  const year = req.query.year || dayjs().format('YYYY')
  const month = req.query.month || dayjs().format('MM')
  res.json(ok(statsMonth(year, month)))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})