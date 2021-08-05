const fs = require('fs');
const accounts = require('../cache/accounts.json')
const config = require('../config/config.json')
const { readFileByLines, lineToMap } = require('./utils')

const initAccount = () => {
  const accountCacheFilePath = './cache/accounts.json'
  const beanAccountFiles = fs.readdirSync(`${config.dataPath}/account`)
  let accounts = []
  beanAccountFiles.forEach(beanAccountFile => {
    let fileAccounts = readFileByLines(`${config.dataPath}/account/${beanAccountFile}`).map(line => lineToMap(line))
    const closeAccountSet = new Set(fileAccounts.filter(a => a.type === 'close').map(a => a.account))
    const fileAccountWords = fileAccounts.filter(fa => !closeAccountSet.has(fa.account)).map(a => a.account)
    accounts = accounts.concat(fileAccountWords)
  })

  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
}

const getAccountLike = (key) => {
  return accounts.filter(account => account.includes(key))
}

const addAcount = (account) => {
  const { type, cata, date, value } = account
  let str;
  if (cata) {
    str = `${date} open ${type}:${cata}:${value} ${config.operatingCurrency}`
  } else {
    str = `${date} open ${type}:${value} ${config.operatingCurrency}`
  }
  fs.appendFileSync(`${config.dataPath}/account/${type.toLowerCase()}.bean`, `${str}\r\n`)
  return str
}

module.exports = {
  initAccount,
  getAccountLike,
  addAcount
}