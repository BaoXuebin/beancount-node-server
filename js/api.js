const dayjs = require('dayjs');
const fs = require('fs');
const process = require('child_process')
const accounts = require('../cache/accounts.json')
const config = require('../config/config.json')
const { readFileByLines, lineToMap } = require('./utils')

const initAccount = () => {
  const accountCacheFilePath = './cache/accounts.json'
  const beanAccountFiles = fs.readdirSync(`${config.dataPath}/account`)
  let accounts = []
  beanAccountFiles.forEach(beanAccountFile => {
    let fileAccounts = readFileByLines(`${config.dataPath}/account/${beanAccountFile}`).map(line => lineToMap(line))
    const closeAccountSet = new Set(fileAccounts.filter(a => a.type === 'close').map(a => a.account))
    const fileAccountWords = fileAccounts.filter(fa => !closeAccountSet.has(fa.account)).map(a => a.account)
    accounts = accounts.concat(fileAccountWords)
  })
  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
}

const getAllAcount = () => accounts

const getAccountLike = (key) => {
  return accounts.filter(account => account.includes(key))
}

const addAccount = (account) => {
  const { type, cata, date, value } = account
  let str;
  if (cata) {
    str = `${date} open ${type}:${cata}:${value} ${config.operatingCurrency}`
  } else {
    str = `${date} open ${type}:${value} ${config.operatingCurrency}`
  }
  fs.appendFileSync(`${config.dataPath}/account/${type.toLowerCase()}.bean`, `${str}\r\n`)
  return str
}

const addEntry = (entry) => {
  const { date, payee, desc, entries } = entry
  let str = `${date} * "${payee || ''}" "${desc}"\r\n`;
  entries.forEach(e => {
    str += `  ${e.account} ${Number(e.amount).toFixed(2)} ${config.operatingCurrency}\r\n`
  })
  const currentMonth = dayjs().format("YYYY-MM");
  const monthBeanFile = `${config.dataPath}/month/${currentMonth}.bean`;
  // 月度账单不存在，则创建
  if (!fs.existsSync(monthBeanFile)) {
    fs.writeFileSync(monthBeanFile, '')
    fs.appendFileSync(`${config.dataPath}/index.bean`, `include "./month/${currentMonth}.bean"\r\n`)
  }
  fs.appendFileSync(`${config.dataPath}/month/${dayjs().format("YYYY-MM")}.bean`, `\r\n${str}\r\n`)
  return str;
}

const statsMonth = (year, month) => {
  let bql = 'SELECT root(account, 1), ABS(sum(position)) as total WHERE account ~ \'Income\' OR account ~ \'Expenses\' OR account ~ \'Liabilities\' AND ';
  if (year) {
    bql += `year = ${year} AND `
  }
  if (month) {
    bql += `month = ${month} AND `
  }
  bql = bql.replace(new RegExp(' AND $'), 'GROUP BY root(account, 1);');
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
  console.log(bql)
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  console.log(bqlResultSet)
  return bqlResultSet.filter(r => r).map(r => {
    const rArray = r.trim().split(/\s+/)
    return {
      id: rArray[0],
      date: rArray[1],
      payee: rArray[2],
      desc: rArray[3],
      account: rArray[4],
      amount: rArray[5],
      operatingCurrency: rArray[6]
    }
  })
}

module.exports = {
  initAccount,
  getAllAcount,
  getAccountLike,
  addAccount,
  addEntry,
  statsMonth,
  listItemByCondition
}