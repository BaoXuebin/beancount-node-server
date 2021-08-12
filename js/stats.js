const process = require('child_process');
const config = require('../config/config.json');

const statsTotalAmount = (year, month) => {
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

module.exports = {
  statsTotalAmount
}