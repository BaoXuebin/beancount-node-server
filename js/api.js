const dayjs = require('dayjs');
const fs = require('fs');
const process = require('child_process')
const iconv = require('iconv-lite');
const accounts = require('../cache/accounts.json')
const config = require('../config/config.json');
const { getAccountCata } = require('./utils');
const accountCacheFilePath = './cache/accounts.json'

const initAccount = () => {
  const bqlResult = iconv.decode(process.execSync(`bean-report ${config.dataPath}/index.bean accounts`, { encoding: 'buffer' }), 'gbk')
  const bqlResultSet = bqlResult.split('\n');
  const accounts = bqlResultSet.map(r => {
    const arr = r.trim().split(/\s+/)
    if (arr.length === 2) {
      return {
        account: arr[0], startDate: arr[1]
      }
    }
    if (arr.length === 3) {
      return {
        account: arr[0], startDate: arr[1], endDate: arr[2]
      }
    }
    return null
  }).filter(a => a)
  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
}

const getAllValidAcount = () => accounts.filter(acc => !acc.endDate).map(acc => acc.account)

const getValidAccountLike = (key) => {
  return accounts.filter(acc => !acc.endDate && acc.account.includes(key))
}

const getAllAccounts = () => {
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean balances`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  const amountAccounts = bqlResultSet.map(r => {
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
  const amountAccountKeys = amountAccounts.map(acc => acc.account);
  return accounts.map(acc => {
    if (amountAccountKeys.indexOf(acc.account) >= 0) {
      const amountAccount = amountAccounts.filter(a => a.account === acc.account)[0]
      return Object.assign(acc, amountAccount)
    }
    return acc
  })
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

const closeAccount = (account, date) => {
  const accountCata = getAccountCata(account)
  const str = `${date} close ${account}`
  fs.appendFileSync(`${config.dataPath}/account/${accountCata.toLowerCase()}.bean`, `\r\n${str}`)
  // 刷新 account 缓存
  accounts.forEach(acc => {
    if (acc.account === account) {
      acc.endDate = date
    }
  })
  fs.writeFileSync(accountCacheFilePath, JSON.stringify(accounts))
  return {
    account,
    endDate: date
  }
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
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
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
  }).reverse()
}

module.exports = {
  initAccount,
  getAllValidAcount,
  getValidAccountLike,
  getAllAccounts,
  addAccount,
  closeAccount,
  addEntry,
  statsMonth,
  listItemByCondition
}