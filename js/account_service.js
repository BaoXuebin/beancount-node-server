const fs = require('fs');
const process = require('child_process')
const Cache = require('./cache');
const { getAccountCata, getAccountTypeDict, commentAccount, getCommoditySymbol, log } = require('./utils');
const dayjs = require('dayjs');
const { getLedgerAccountTypesFilePath, getMonthsFilePath } = require('./path');

const getAllValidAcount = (config) => {
  return Cache.Accounts[config.id].filter(acc => !acc.endDate).sort()
}

const getValidAccountLike = (config, key) => {
  return Cache.Accounts[config.id].filter(acc => !acc.endDate && acc.account.includes(key))
}

const getAllAccounts = (config) => {
  // 账户市场价: select account, sum(convert(value(position), 'CNY'))
  const cmd = `bean-query "${config.dataPath}/index.bean" "select account, sum(convert(value(position), '${config.operatingCurrency}'))"`
  const bqlResult = process.execSync(cmd).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  // 每个账户的金额
  const amountAccounts = bqlResultSet.map(r => {
    if (r.search(/\{(.+?)\}/)) { // 包含大括号，即包含汇率计算
      r = r.replace('{', '').replace('}', '')
    }
    const arr = r.trim().split(/\s+/)
    if (arr.length === 3) {
      return {
        account: arr[0],
        amount: arr[1],
        commodity: arr[2],
        commoditySymbol: getCommoditySymbol(arr[2])
      }
    } else if (arr.length === 5) { // 包含汇率转换
      return {
        account: arr[0],
        amount: arr[1],
        commodity: arr[2],
        commoditySymbol: getCommoditySymbol(arr[2]),
        price: arr[3],
        priceCommodity: arr[4],
        priceCommoditySymbol: getCommoditySymbol(arr[4]),
      }
    }
    return null;
  }).filter(a => a);

  const amountAccountKeys = amountAccounts.map(acc => acc.account)
  return Cache.Accounts[config.id].filter(acc => !acc.endDate).map(acc => {
    acc.type = getAccountTypeDict(config, acc.account)
    if (amountAccountKeys.indexOf(acc.account) >= 0) {
      const amountAccount = amountAccounts.filter(a => a.account === acc.account)[0]
      return Object.assign(amountAccount, acc)
    }
    return acc
  })
}

const addAccount = (config, account, commodity, date) => {
  const existAccount = Cache.Accounts[config.id].filter(acc => acc.account === account)[0]
  if (existAccount) { // 之前存在该账户
    date = existAccount.startDate
    delete existAccount.endDate;
    commentAccount(config, account, ' close ')
  } else {
    Cache.Accounts[config.id].push({ account, startDate: date, commodity })
    const str = `${date} open ${account} ${commodity}`
    fs.appendFileSync(`${config.dataPath}/account/${getAccountCata(account).toLowerCase()}.bean`, `\r\n${str}`)
  }

  return {
    account,
    commodity,
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
  const arr = Cache.Accounts[config.id].filter(acc => acc.account === account)
  if (arr && arr.length > 0) {
    const month = dayjs(date).format('YYYY-MM');
    const yesterday = dayjs(date).add(-1, 'day').format('YYYY-MM-DD');
    const str = `\r\n${yesterday} pad ${account} Equity:OpeningBalances\r\n${date} balance ${account} ${amount} ${arr[0].commodity}\r\n`

    const beanFilePath = `${config.dataPath}/month/${month}.bean`
    if (!fs.existsSync(beanFilePath)) {
      fs.appendFileSync(getMonthsFilePath(config.dataPath), `\r\ninclude "./${month}.bean"`)
    }
    fs.appendFileSync(beanFilePath, `\r\n${str}`)

    log(config.mail, `balance account: ${str}`);
  }

  return { account, date, amount }
}

const addAccountType = (config, type, name) => {
  const ledgerAccountTypeFilePath = getLedgerAccountTypesFilePath(config.dataPath)
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
  getAllValidAcount,
  getValidAccountLike,
  getAllAccounts,
  addAccount,
  closeAccount,
  balanceAccount,
  addAccountType,
  getAllAcountTypes
}