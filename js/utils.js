const fs = require('fs');

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
    return account.split(':')[1]
  }
  return ''
}
const getAccountName = account => {
  const array = account.split(':')
  if (array && array.length >= 3) {
    return account.split(':')[2]
  }
  return ''
}

module.exports = {
  readFileByLines,
  lineToMap,
  getAccountCata,
  getAccountType,
  getAccountName
}
