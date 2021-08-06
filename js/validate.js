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

module.exports = {
  isBlank,
  isBalance,
  validateAccountType
}