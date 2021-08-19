const process = require('child_process');
const { default: Decimal } = require('decimal.js');
const e = require('express');

const statsTotalAmount = (config, year, month) => {
  let bql = 'SELECT root(account, 1), sum(position)';
  if (year) {
    bql += `FROM year = ${year}`
  }
  if (month) {
    bql += `AND month = ${month}`
  }
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
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
    bql = `SELECT root(account, ${subAccountLevel}) as subAccount, sum(position) WHERE account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? 'AND month = ' + month : ''} GROUP BY subAccount`;
  } else {
    bql = `SELECT account, sum(position) WHERE account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? 'AND month = ' + month : ''} GROUP BY account`;
  }
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
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
    queryAmount = 'sum(position) as total'
    grouBy = 'GROUP BY date'
  } else if (type === 'sum') {
    queryAmount = 'balance'
    grouBy = ''
  } else {
    return []
  }
  let bql = `SELECT date, ${queryAmount} WHERE account ~ '${prefix}' ${year ? 'AND year = ' + year : ''} ${month ? ' AND month = ' + month : ''} ${grouBy}`
  console.log(bql)
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
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
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(a => a).map(r => {
    const arr = r.trim().split(/\s+/)
    return `${arr[0]}-${arr[1]}`
  });
}

module.exports = {
  statsTotalAmount,
  statsSubAccountPercent,
  statsAccountTrend,
  statsLedgerMonths
}