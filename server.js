const express = require('express')
const { isBlank, validateAccountType } = require('./js/validate')
const { initAccount, getAccountLike, addAccount, addEntry } = require('./js/api')

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
    res.json(ok())
  } else {
    res.json(ok(getAccountLike(key)))
  }
})

app.post('/account', function (req, res) {
  const account = req.body;
  type = validateAccountType(account.type)
  if (!type || isBlank(account.date) || isBlank(account.value)) {
    res.json(badRequest())
  } else {
    res.json(ok(addAccount(account)))
  }
})

app.post('/entry', function (req, res) {
  const entry = req.body;
  if (!entry || isBlank(entry.date) || isBlank(entry.desc) || !entry.entries) {
    res.json(badRequest())
  } else {
    res.json(ok(addEntry(entry)))
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})