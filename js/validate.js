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

module.exports = {
  isBlank,
  validateAccountType
}