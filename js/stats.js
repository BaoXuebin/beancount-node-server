const process = require('child_process');
const { log } = require('./utils')

const statsTotalAmount = (config, year, month) => {
  let bql = `SELECT root(account, 1), sum(convert(value(position), '${config.operatingCurrency}'))`;
  if (year) {
    bql += ` FROM year = ${year}`
  }
  if (month) {
    bql += ` AND month = ${month}`
  }
  const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
  const bqlResult = process.execSync(cmd).toString()
  log(config.mail, cmd)
  const bqlResultSet = bqlResult.split(/\n|,/).splice(2);
  let obj = {};
  bqlResultSet.forEach(r => {
    const arr = r.trim().split(/\s+/)
    if (arr.length === 3) {
      obj[arr[0]] = arr[1]
    }
  });
  return obj;
}

const statsSubAccountPercent = (config, prefix, year, month, level) => {
  let bql;
  if (level) {
    const subAccountLevel = prefix.split(':').filter(a => a).length + Number(level)
    bql = `SELECT root(account, ${subAccountLevel}) as subAccount, sum(convert(value(position), '${config.operatingCurrency}')) WHERE account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? 'AND month = ' + month : ''} GROUP BY subAccount`;
  } else {
    bql = `SELECT account, sum(convert(value(position), '${config.operatingCurrency}')) WHERE account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? 'AND month = ' + month : ''} GROUP BY account`;
  }
  const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
  const bqlResult = process.execSync(cmd).toString()
  log(config.mail, cmd)
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.map(r => {
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
}


const statsAccountTrend = (config, prefix, year, month, type) => {
  let queryAmount, grouBy
  if (type === 'avg') {
    queryAmount = `sum(convert(value(position), '${config.operatingCurrency}')) as total`
    grouBy = 'GROUP BY date'
  } else if (type === 'sum') {
    queryAmount = `convert(balance, '${config.operatingCurrency}')`
    grouBy = ''
  } else {
    return []
  }
  let bql = `SELECT date, ${queryAmount} WHERE account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? ' AND month = ' + month : ''} ${grouBy}`
  const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
  const bqlResult = process.execSync(cmd).toString()
  log(config.mail, cmd)
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.map(r => {
    const arr = r.trim().split(/\s+/)
    if (arr.length === 3) {
      return {
        date: arr[0],
        amount: Number(arr[1]),
        operatingCurrency: arr[2]
      }
    }
    return null;
  }).filter(a => a);
}

const statsLedgerMonths = (config) => {
  let bql = 'SELECT distinct year(date), month(date)';
  const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
  const bqlResult = process.execSync(cmd).toString()
  log(config.mail, cmd)
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(a => a).map(r => {
    const arr = r.trim().split(/\s+/)
    return `${arr[0]}-${arr[1]}`
  });
}

const statsPayee = (config, prefix, year, month, type) => {
  let bql = `SELECT payee, count(payee), sum(convert(value(position), '${config.operatingCurrency}')) WHERE currency = '${config.operatingCurrency}' AND account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? ' AND month = ' + month : ''} GROUP BY payee`
  const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
  const bqlResult = process.execSync(cmd).toString()
  log(config.mail, cmd)
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.map(r => {
    const arr = r.trim().split(/\s+/)
    let value;
    if (type === 'cot') {
      value = Number(arr[arr.length - 3])
    } else if (type === 'avg') {
      value = Number((Number(arr[arr.length - 2]) / Number(arr[arr.length - 3])).toFixed(2))
    } else {
      value = Number(arr[arr.length - 2])
    }
    return {
      payee: arr.slice(0, arr.length - 3).join(''),
      value,
      operatingCurrency: arr[arr.length - 1]
    }
  }).filter(a => a).sort((a, b) => a.value - b.value);
}

const statsMonthIncomeExpenses = (config) => {
  let monthIncomeBql = `SELECT year, month, neg(sum(convert(value(position), '${config.operatingCurrency}'))) WHERE account ~ 'Income' group by year, month order by year, month`
  let monthExpensesBql = `SELECT year, month, sum(convert(value(position), '${config.operatingCurrency}')) WHERE account ~ 'Expenses' group by year, month order by year, month`
  const bqls = [monthIncomeBql, monthExpensesBql]
  let [income, expenses] = bqls.map(bql => {
    const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
    const bqlResult = process.execSync(cmd).toString()
    log(config.mail, cmd)
    const bqlResultSet = bqlResult.split('\n').splice(2);
    return bqlResultSet.map(r => {
      const arr = r.trim().split(/\s+|,/)
      return { month: `${arr[0]}-${arr[1]}`, amount: Number(arr[2]), operatingCurrency: arr[3] }
    }).filter(a => a);
  })
  const incomeResult = income.map(inc => Object.assign({ type: '收入' }, inc))
  const expensesResult = expenses.map(exp => Object.assign({ type: '支出' }, exp))
  const balanceResult = income.map(inc => {
    const filterArr = expenses.filter(exp => inc.month === exp.month)
    if (filterArr && filterArr.length > 0) {
      inc.amount = Number((inc.amount - filterArr[0].amount).toFixed(2))
      inc.type = '结余'
    }
    return inc
  })
  return incomeResult.concat(expensesResult).concat(balanceResult)
}

module.exports = {
  statsTotalAmount,
  statsSubAccountPercent,
  statsAccountTrend,
  statsLedgerMonths,
  statsPayee,
  statsMonthIncomeExpenses
}