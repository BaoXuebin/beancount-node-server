const { getAccountCata } = require('./utils');
const Cache = require('./cache');

const isBlank = str => {
  return !str || !(str.trim())
}

const validateAccount = (account) => {
  if (account.split(':').length !== 3) {
    return false
  }
  const accountCata = getAccountCata(account)
  if (!['Assets', 'Income', 'Expenses', 'Liabilities', 'Equity'].includes(accountCata)) {
    return false
  }
  return true;
}

const isBalance = (entries) => {
  let sum = 0;
  entries.forEach(e => {
    sum += Number(e.amount)
  })
  return sum === 0
}

const validateAccountCloseDate = (account, date) => {
  const accArr = Cache.Accounts.filter(acc => acc.account === account)
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

module.exports = {
  isBlank,
  isBalance,
  validateAccount,
  validateAccountCloseDate
}