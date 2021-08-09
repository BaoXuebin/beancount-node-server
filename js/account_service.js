const fs = require('fs');
const process = require('child_process')
const iconv = require('iconv-lite');
const accounts = require('../cache/accounts.json')
const config = require('../config/config.json');
const AccountTypes = require('../config/account_cata_list.json');
const { getAccountCata } = require('./utils');
const accountCacheFilePath = './cache/accounts.json'

const initAccount = () => {
  const bqlResult = iconv.decode(process.execSync(`bean-report ${config.dataPath}/index.bean accounts`, { encoding: 'buffer' }), 'gbk')
  const bqlResultSet = bqlResult.split('\n');
  const accounts = bqlResultSet.map(r => {
    const arr = r.trim().split(/\s+/)
    if (arr.length === 2) {
      return {
        account: arr[0], startDate: arr[1]
      }
    }
    if (arr.length === 3) {
      return {
        account: arr[0], startDate: arr[1], endDate: arr[2]
      }
    }
    return null
  }).filter(a => a)
  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
}

const getAllValidAcount = () => accounts.filter(acc => !acc.endDate).map(acc => acc.account)

const getValidAccountLike = (key) => {
  return accounts.filter(acc => !acc.endDate && acc.account.includes(key))
}

const getAllAccounts = () => {
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean balances`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  const amountAccounts = bqlResultSet.map(r => {
    const arr = r.trim().split(/\s+/)
    if (arr.length === 3) {
      return {
        account: arr[0],
        amount: arr[1],
        operatingCurrency: arr[2]
      }
    }
    return null;
  }).filter(a => a);
  const amountAccountKeys = amountAccounts.map(acc => acc.account);
  return accounts.map(acc => {
    if (amountAccountKeys.indexOf(acc.account) >= 0) {
      const amountAccount = amountAccounts.filter(a => a.account === acc.account)[0]
      return Object.assign(acc, amountAccount)
    }
    return acc
  })
}

const addAccount = (account, date) => {
  const accountCata = getAccountCata(account)
  const str = `${date} open ${account} ${config.operatingCurrency}`
  fs.appendFileSync(`${config.dataPath}/account/${accountCata.toLowerCase()}.bean`, `\r\n${str}`)
  // 刷新 account 缓存
  accounts.push({ account, startDate: date })
  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
  return {
    account,
    startDate: date
  }
}

const closeAccount = (account, date) => {
  const accountCata = getAccountCata(account)
  const str = `${date} close ${account}`
  fs.appendFileSync(`${config.dataPath}/account/${accountCata.toLowerCase()}.bean`, `\r\n${str}`)
  // 刷新 account 缓存
  accounts.forEach(acc => {
    if (acc.account === account) {
      acc.endDate = date
    }
  })
  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
  return {
    account,
    endDate: date
  }
}

const getAllAcountTypes = (cata) => {
  let accountCata = AccountTypes
  if (cata) {
    return AccountTypes[cata] ? AccountTypes[cata].map(type => ({ key: `${cata}:${type.key}`, name: type.name })) : []
  }
  let result = []
  Object.keys(accountCata).forEach(cata => {
    result = result.concat(AccountTypes[cata].map(type => ({ key: `${cata}:${type.key}`, name: type.name })))
  })
  return result;
}

module.exports = {
  initAccount,
  getAllValidAcount,
  getValidAccountLike,
  getAllAccounts,
  addAccount,
  closeAccount,
  getAllAcountTypes
}