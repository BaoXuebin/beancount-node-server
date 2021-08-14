const process = require('child_process');

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
  statsLedgerMonths
}