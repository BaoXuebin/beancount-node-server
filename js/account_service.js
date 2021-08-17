const fs = require('fs');
const process = require('child_process')
const Cache = require('./cache');
const DefaultAccountType = require('../config/account_type.json')
const { getAccountCata, readFileByLines, lineToMap, getAccountTypeDict, commentAccount } = require('./utils');
const { getLedgerAccountTypesFilePath } = require('./path');
const dayjs = require('dayjs');

const initAccountCache = (config) => {
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
  Cache.Accounts[config.id] = Object.values(dict)
  console.log(`Success init cache: [${config.mail} accounts]`)
}

const initAccountTypesCache = (config) => {
  const ledgerAccountTypeFilePath = getLedgerAccountTypesFilePath(config.dataPath)
  if (fs.existsSync(ledgerAccountTypeFilePath)) {
    Cache.AccountTypes[config.id] = JSON.parse(fs.readFileSync(ledgerAccountTypeFilePath))
  } else {
    Cache.AccountTypes[config.id] = DefaultAccountType
    fs.writeFileSync(ledgerAccountTypeFilePath, JSON.stringify(DefaultAccountType))
  }
  console.log(`Success init cache: [${config.mail} accountTypes]`)
}

const getAllValidAcount = (config) => {
  return Cache.Accounts[config.id].filter(acc => !acc.endDate).map(acc => acc.account).sort()
}

const getValidAccountLike = (config, key) => {
  return Cache.Accounts[config.id].filter(acc => !acc.endDate && acc.account.includes(key))
}

const getAllAccounts = (config) => {
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean balances`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  // 每个账户的金额
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

  const amountAccountKeys = amountAccounts.map(acc => acc.account)
  return Cache.Accounts[config.id].filter(acc => !acc.endDate).map(acc => {
    acc.type = getAccountTypeDict(config, acc.account)
    if (amountAccountKeys.indexOf(acc.account) >= 0) {
      const amountAccount = amountAccounts.filter(a => a.account === acc.account)[0]
      return Object.assign(acc, amountAccount)
    }
    return acc
  })
}

const addAccount = (config, account, date) => {
  const existAccount = Cache.Accounts[config.id].filter(acc => acc.account === account)[0]
  if (existAccount) { // 之前存在该账户
    date = existAccount.startDate
    delete existAccount.endDate;
    commentAccount(account, ' close ')
  } else {
    Cache.Accounts[config.id].push({ account, startDate: date })
    const str = `${date} open ${account} ${config.operatingCurrency}`
    fs.appendFileSync(`${config.dataPath}/account/${getAccountCata(account).toLowerCase()}.bean`, `\r\n${str}`)
  }

  return {
    account,
    startDate: date,
    type: getAccountTypeDict(config, account)
  }
}

const closeAccount = (config, account, date) => {
  const accountCata = getAccountCata(account)
  const str = `${date} close ${account}`
  fs.appendFileSync(`${config.dataPath}/account/${accountCata.toLowerCase()}.bean`, `\r\n${str}`)
  // 刷新 account 缓存
  Cache.Accounts[config.id].forEach(acc => {
    if (acc.account === account) {
      acc.endDate = date
    }
  })
  return {
    account,
    endDate: date
  }
}

const balanceAccount = (config, account, date, amount) => {
  const month = dayjs(date).format('YYYY-MM');
  const yesterday = dayjs(date).add(-1, 'day').format('YYYY-MM-DD');
  const str = `${yesterday} pad ${account} Equity:OpeningBalances\r\n${date} balance ${account} ${amount} ${config.operatingCurrency}\r\n`
  fs.appendFileSync(`${config.dataPath}/month/${month}.bean`, `\r\n${str}`)

  return { account, date, amount}
}

const addAccountType = (config, type, name) => {
  const ledgerAccountTypeFilePath = `${config.dataPath}/account_type.json`
  if (fs.existsSync(ledgerAccountTypeFilePath)) {
    const AccountTypeDict = JSON.parse(fs.readFileSync(ledgerAccountTypeFilePath))
    AccountTypeDict[type] = name;
    Cache.AccountTypes[config.id] = AccountTypeDict
    fs.writeFileSync(ledgerAccountTypeFilePath, JSON.stringify(AccountTypeDict))
    return { key: type, name }
  }
  return null;
}

const getAllAcountTypes = (config, cata) => {
  const AccountTypeDict = Cache.AccountTypes[config.id]
  return Object.keys(AccountTypeDict).filter(key => !cata || key.startsWith(cata)).map(key => ({ key, name: AccountTypeDict[key] }))
}


module.exports = {
  initAccountCache,
  initAccountTypesCache,
  getAllValidAcount,
  getValidAccountLike,
  getAllAccounts,
  addAccount,
  closeAccount,
  balanceAccount,
  addAccountType,
  getAllAcountTypes
}