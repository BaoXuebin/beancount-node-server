const fs = require('fs')
const crypto = require('crypto')
const Cache = require('./cache')
const path = require('path');
const dayjs = require('dayjs');

// 忽略注释行
const isCommnetLine = line => line.startsWith('* ');

// 读取文件行
const readFileByLines = (path) => {
  const lines = fs.readFileSync(path, 'utf-8').split(/[\r\n]/)
  return lines.filter(l => l && !isCommnetLine(l))
}

const lineToMap = account => {
  const words = account.split(' ')
  return {
    date: words[0],
    type: words[1],
    account: words[2],
    commodity: words[3]
  }
}

const getAccountCata = account => {
  const array = account.split(':')
  if (array && array.length >= 1) {
    return account.split(':')[0]
  }
  return ''
}
const getAccountType = account => {
  const array = account.split(':').reverse()
  for (let i = 0; i < array.length; i++) {
    const type = array[i]
    if (new RegExp('^[a-zA-Z]').test(type)) {
      return type
    }
  }
  return ''
}
const getAccountName = account => {
  const array = account.split(':')
  if (array && array.length >= 2) {
    return account.split(':')[array.length - 1]
  }
  return ''
}

const getAccountTypeDict = (config, account) => {
  const AccountTypeDict = Cache.AccountTypes[config.id]
  const accountTypeKeys = Object.keys(AccountTypeDict);
  const keys = accountTypeKeys.filter(typeKey => account.includes(typeKey))
  let key = '';
  for (let k of keys) {
    if (k.length > key.length) {
      key = k;
    }
  }
  if (key) {
    return { key, name: AccountTypeDict[key] }
  }

  const accountTypeName = account.split(":").reverse()[0]
  return { key: accountTypeName, name: accountTypeName }
}

const commentAccount = (config, account, keyword) => {
  const beanfilePath = `${config.dataPath}/account/${getAccountCata(account).toLowerCase()}.bean`;
  const accountLines = fs.readFileSync(beanfilePath, 'utf8').split('\r\n');

  const content = accountLines.map(line => {
    if (line.indexOf(account) >= 0) {
      if (keyword) {
        return line.indexOf(keyword) >= 0 ? ('; ' + line) : line;
      }
      return '; ' + line;
    }
    return line;
  }).join('\r\n')
  fs.writeFileSync(beanfilePath, content, 'utf8');
}

const getSha1Str = (str) => {
  const shasum = crypto.createHash('sha1')
  shasum.update(str)
  return shasum.digest('hex')
}

const getCommoditySymbol = commodity => {
  commodity = commodity.toUpperCase()
  if (commodity === 'CNY') {
    return '￥'
  } else if (commodity === 'USD') {
    return '$'
  }
  return ''
}

const ignoreInvalidChar = rawStr => rawStr ? rawStr.replace(/("|\\)*/g, '') : ''
const ignoreInvalidCharAndBlank = rawStr => rawStr ? rawStr.replace(/(\s|"|\\)*/g, '') : ''

const getAllDirFiles = (paretPath, childDirPath) => {
  let dirs = []
  let files = []
  const filePath = path.join(paretPath, childDirPath || '')
  let exampleFiles = fs.readdirSync(filePath)
  for (let childFilePath of exampleFiles) {
    const stat = fs.statSync(path.join(filePath, childFilePath))
    const childFullPath = path.join(childDirPath || '', childFilePath)
    if (stat.isFile()) {
      files.push(childFullPath)
    } else if (stat.isDirectory()) {
      dirs.push(childFullPath)
      const result = getAllDirFiles(paretPath, childFullPath);
      dirs = dirs.concat(result.dirs)
      files = files.concat(result.files)
    }
  }
  return { dirs, files };
}

const log = (user, content) => {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
  if (user) {
    console.log(`[${time}] [${user}] ${content}`)
  } else {
    console.log(`[${time}] ${content}`)
  }
}

const addZeros = str => '\\u' + ("0000" + str).slice(-4)

const unicodeStr = (str) => {
  return str.split("").map(char => {
    if (!/^[\x00-\x7F]+$/.test(char)) {
      return addZeros(char.charCodeAt(0).toString(16))
    }
    return char
  }).join("");
}

module.exports = {
  readFileByLines,
  lineToMap,
  getAccountCata,
  getAccountType,
  getAccountTypeDict,
  getAccountName,
  commentAccount,
  getSha1Str,
  ignoreInvalidChar,
  ignoreInvalidCharAndBlank,
  getCommoditySymbol,
  getAllDirFiles,
  log,
  unicodeStr
}
