const dayjs = require('dayjs');
const fs = require('fs');
const process = require('child_process');
const config = require('../config/config.json');

const addEntry = (entry) => {
  const { date, payee, desc, entries } = entry
  let str = `\r\n${date} * "${payee || ''}" "${desc}"`;
  entries.forEach(e => {
    str += `\r\n  ${e.account} ${Number(e.amount).toFixed(2)} ${config.operatingCurrency}`
  })
  const currentMonth = dayjs().format("YYYY-MM");
  const monthBeanFile = `${config.dataPath}/month/${currentMonth}.bean`;
  // 月度账单不存在，则创建
  if (!fs.existsSync(monthBeanFile)) {
    fs.writeFileSync(monthBeanFile, '')
    fs.appendFileSync(`${config.dataPath}/index.bean`, `\r\ninclude "./month/${currentMonth}.bean"`)
  }
  fs.appendFileSync(`${config.dataPath}/month/${dayjs().format("YYYY-MM")}.bean`, `\r\n${str}`)
  return str;
}



const listItemByCondition = ({ type, year, month }) => {
  let bql = 'SELECT id, date, payee, narration, account, position';
  if (type || year || month) {
    bql += ' WHERE ';
    if (type) {
      bql += `account ~ '${type}' AND `
    }
    if (year) {
      bql += `year = ${year} AND `
    }
    if (month) {
      bql += `month = ${month} AND `
    }
    bql = bql.replace(new RegExp(' AND $'), ';');
  }
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(r => r).map(r => {
    const rArray = r.trim().split(/\s+/)
    if (rArray.length === 7) {
      return {
        id: rArray[0],
        date: rArray[1],
        payee: rArray[2],
        desc: rArray[3],
        account: rArray[4],
        amount: rArray[5],
        operatingCurrency: rArray[6]
      }
    } else if (rArray.length === 6) {
      return {
        id: rArray[0],
        date: rArray[1],
        payee: '',
        desc: rArray[2],
        account: rArray[3],
        amount: rArray[4],
        operatingCurrency: rArray[5]
      }
    }
    return null;
  }).filter(a => a).reverse()
}

const execCmd = cmd => process.execSync(cmd).toString()

module.exports = {
  addEntry,
  listItemByCondition,
  execCmd
}