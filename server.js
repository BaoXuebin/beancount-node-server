const express = require('express')
const { isBlank, validateAccountType } = require('./validate')
const { initAccount, getAccountLike, addAcount } = require('./api')
const e = require('express')

// 初始化 account
initAccount()

const app = express()
const port = 3000

app.use(express.json())

const ok = data => ({ code: 200, data })
const badRequest = () => ({ code: 400 })

app.get('/account', function (req, res) {
  const key = req.query.key;
  if (isBlank(key)) {
    res.json(ok(getAccountLike(key)))
  } else {
    res.json(ok())
  }
})

app.post('/account', function (req, res) {
  const account = req.body;
  type = validateAccountType(account.type)
  if (!type || isBlank(account.date) || isBlank(account.value)) {
    res.json(badRequest())
  } else {
    res.json(ok(addAcount(account)))
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})