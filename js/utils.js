const fs = require('fs');
const process = require('child_process')
const config = require('../config/config.json');
const crypto = require('crypto');
const Cache = require('./cache');
const iconv = require('iconv-lite')
const path = require('path')

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

const commentAccount = (account, keyword) => {
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
  return commodity
}

const ignoreInvalidChar = rawStr => rawStr ? rawStr.replace(/("|\\)*/g, '') : ''
const ignoreInvalidCharAndBlank = rawStr => rawStr ? rawStr.replace(/(\s|"|\\)*/g, '') : ''


const execBeancountCmd = (cmd, params) => {
  if (cmd === 'bean-query' && params && params.length === 2) {
    return process.execSync(`${cmd} ${params.map(p => `"${p}"`).join(" ")}`).toString()
  } else if (cmd === 'bean-report' && params && params.length === 2) {
    cmd = `${cmd} ${params.map(p => `"${p}"`).join(" ")}`
    const buffer = process.execSync(cmd, { encoding: 'buffer' })
    return iconv.decode(buffer, 'cp936');
  }
}

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
  execBeancountCmd,
  getAllDirFiles
}
