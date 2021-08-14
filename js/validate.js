const { getAccountCata, getSha1Str } = require('./utils');
const Cache = require('./cache');
const { Decimal } = require('decimal.js');

const isBlank = str => {
  return !str || !(str.trim())
}

const validateAccount = (config, account) => {
  if (account.split(':').length < 3) {
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

const isBalance = (entries) => {
  let sum = Decimal(0);
  entries.forEach(e => {
    sum = sum.plus(Decimal(e.amount))
  })
  return Number(sum) === 0
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

module.exports = {
  isBlank,
  isBalance,
  isMailAndSecretMatch,
  validateAccount,
  validateAccountCloseDate
}