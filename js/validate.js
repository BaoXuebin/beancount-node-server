const accounts = require('../cache/accounts.json');

const isBlank = str => {
  return !str || !(str.trim())
}

const validateAccountType = (type) => {
  if (isBlank(type)) {
    return null;
  }
  type = type.toUpperCase();
  if (type === 'ASSETS') {
    return 'Assets'
  } else if (type === 'INCOME') {
    return 'Income'
  } else if (type === 'EXPENSES') {
    return 'Expenses'
  } else if (type === 'LIABILITIES') {
    return 'Liabilities'
  } else if (type === 'EQUITY') {
    return 'Equity'
  }
  return null;
}

const isBalance = (entries) => {
  let sum = 0;
  entries.forEach(e => {
    sum += Number(e.amount)
  })
  return sum === 0
}

const validateAccountCloseDate = (account, date) => {
  const accArr = accounts.filter(acc => acc.account === account)
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
  validateAccountType,
  validateAccountCloseDate
}