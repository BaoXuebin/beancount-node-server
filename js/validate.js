const { getAccountCata, getSha1Str } = require('./utils');
const Cache = require('./cache');
const WhiteList = require('../config/white_list.json');
const { Decimal } = require('decimal.js');

const isBlank = str => {
  return !str || !(str.trim())
}

const validateAccount = (config, account) => {
  if (account.split(':').length < 2) {
    return false
  }
  const accountCata = getAccountCata(account)
  if (!['Assets', 'Income', 'Expenses', 'Liabilities', 'Equity'].includes(accountCata)) {
    return false
  }
  const exist = Cache.Accounts[config.id].filter(acc => acc.account === account);
  if (exist && exist.lenght > 0) {
    return false;
  }
  return true;
}

const validateAccountType = (type) => {
  const accountCata = getAccountCata(type)
  return ['Assets', 'Income', 'Expenses', 'Liabilities', 'Equity'].includes(accountCata);
}

const isBalance = (entries) => {
  let sum = Decimal(0);
  entries.forEach(e => {
    const { amount, commodity, price, priceCommodity } = e
    if (e.account === 'Equity:OpeningBalances') {
      return
    }
    if (priceCommodity && priceCommodity !== commodity) {
      sum = sum.plus(Decimal(amount).mul(Decimal(price)))
    } else {
      sum = sum.plus(Decimal(amount))
    }
  })
  return Number(sum) < 0.01
}

const validateAccountCloseDate = (config, account, date) => {
  const accArr = Cache.Accounts[config.id].filter(acc => acc.account === account)
  if (accArr.length === 0) {
    return false;
  }
  if (accArr[0].endDate) {
    return false;
  }
  if (accArr[0].startDate > date) {
    return false;
  }
  return true;
}

const isMailAndSecretMatch = (mail, secret) => {
  const ledgerConfig = Object.values(Cache.LedgerConfig).filter(ledger => ledger.mail === mail)[0]
  // 邮箱存在，则校验密码
  if (ledgerConfig) {
    return getSha1Str(mail + secret) === ledgerConfig.id
  }
  return true
}

const inWhiteList = (mail) => {
  // whitelist.json 为空则表示不作限制
  if (WhiteList && WhiteList.length > 0) {
    return WhiteList.includes(mail)
  }
  return true;
}

module.exports = {
  isBlank,
  isBalance,
  isMailAndSecretMatch,
  inWhiteList,
  validateAccount,
  validateAccountType,
  validateAccountCloseDate
}