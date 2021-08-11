const fs = require('fs');
const process = require('child_process')
const config = require('../config/config.json');
const AccountTypes = require('../config/account_cata_list.json');
const Cache = require('./cache');
const { getAccountCata, readFileByLines, lineToMap, getAccountType, getAccountTypeDict, commentAccount } = require('./utils');

const initAccount = () => {
  const beanAccountFiles = fs.readdirSync(`${config.dataPath}/account`)
  let dict = {}
  beanAccountFiles.forEach(beanAccountFile => {
    let fileAccounts = readFileByLines(`${config.dataPath}/account/${beanAccountFile}`).map(line => lineToMap(line))
    fileAccounts.forEach(acc => {
      if (dict[acc.account]) {
        if (acc.type === 'open') {
          dict[acc.account].startDate = acc.date
        } else {
          dict[acc.account].endDate = acc.date
        }
      } else {
        if (acc.type === 'open') {
          dict[acc.account] = { account: acc.account, startDate: acc.date }
        } else {
          dict[acc.account] = { account: acc.account, endDate: acc.date }
        }
      }
    })
  })
  Cache.Accounts = Object.values(dict)
}

const getAllValidAcount = () => Cache.Accounts.filter(acc => !acc.endDate).map(acc => acc.account)

const getValidAccountLike = (key) => {
  return Cache.Accounts.filter(acc => !acc.endDate && acc.account.includes(key))
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
  return Cache.Accounts.filter(acc => !acc.endDate).map(acc => {
    acc.type = getAccountTypeDict(acc.account)
    if (amountAccountKeys.indexOf(acc.account) >= 0) {
      const amountAccount = amountAccounts.filter(a => a.account === acc.account)[0]
      return Object.assign(acc, amountAccount)
    }
    return acc
  })
}

const addAccount = (account, date) => {
  const existAccount = Cache.Accounts.filter(acc => acc.account === account)[0]
  if (existAccount) { // 之前存在该账户
    existAccount.startDate = date;
    delete existAccount.endDate;
    //
    commentAccount(account)
  } else {
    Cache.Accounts.push({ account, startDate: date })
  }

  const str = `${date} open ${account} ${config.operatingCurrency}`
  fs.appendFileSync(`${config.dataPath}/account/${getAccountCata(account).toLowerCase()}.bean`, `\r\n${str}`)

  return {
    account,
    startDate: date,
    type: getAccountTypeDict(account)
  }
}

const closeAccount = (account, date) => {
  const accountCata = getAccountCata(account)
  const str = `${date} close ${account}`
  fs.appendFileSync(`${config.dataPath}/account/${accountCata.toLowerCase()}.bean`, `\r\n${str}`)
  // 刷新 account 缓存
  Cache.Accounts.forEach(acc => {
    if (acc.account === account) {
      acc.endDate = date
    }
  })
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