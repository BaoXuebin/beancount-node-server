const fs = require('fs');
const AccountTypes = require('../config/account_cata_list.json');
const config = require('../config/config.json');

// 忽略注释行
const isCommnetLine = line => line.startsWith('* ');

// 读取文件行
const readFileByLines = (path) => {
  const lines = fs.readFileSync(path, 'utf-8').split('\r\n')
  return lines.filter(l => l && !isCommnetLine(l))
}

const lineToMap = account => {
  const words = account.split(' ')
  return {
    date: words[0],
    type: words[1],
    account: words[2],
    moneyType: words[3]
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
  const array = account.split(':')
  if (array && array.length >= 2) {
    return account.split(':')[array.length - 1]
  }
  if (array && array.length >= 3) {
    return account.split(':')[array.length - 2]
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

const getAccountTypeDict = account => {
  const cataTypes = AccountTypes[getAccountCata(account)]
  if (cataTypes) {
    const arr = cataTypes.filter(ct => ct.key === getAccountType(account))
    if (arr.length > 0) {
      return arr[0]
    }
  }
  const accType = getAccountType(account)
  return { key: accType, value: accType }
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

module.exports = {
  readFileByLines,
  lineToMap,
  getAccountCata,
  getAccountType,
  getAccountTypeDict,
  getAccountName,
  commentAccount
}
