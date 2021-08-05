const fs = require('fs');
const config = require('./config.json')

const dataPath = config.dataPath;

// 初始化必须的文件结构
const dirs = [
  dataPath,
  `${dataPath}/account`,
  `${dataPath}/month`,
  '_cache',
]

const files = [
  [`${dataPath}/account/assets.bean`, ''],
  [`${dataPath}/account/equity.bean`, ''],
  [`${dataPath}/account/expenses.bean`, ''],
  [`${dataPath}/account/income.bean`, ''],
  [`${dataPath}/account/liabilities.bean`, ''],
  ['_cache/accounts.json', "[]"],
]

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d)
  }
})
files.forEach(fArray => {
  if (!fs.existsSync(fArray[0])) {
    fs.writeFileSync(fArray[0], fArray[1])
  }
})



// conf.bean 初始化内容
const confLines = [
  `option "title" "${config.title}"`,
  `option "operating_currency" "${config.operatingCurrency}"`,
  'option "render_commas" "TRUE"',
  '2021-01-01 custom "fava-option" "interval" "day"',
  '2021-01-01 custom "fava-option" "language" "zh_CN"'
]

// index.bean 初始化内容
const indexLines = () => {
  let lines = ['include "./conf.bean"'];
  fs.readdirSync(`${dataPath}/acount`).forEach(file => {
    lines.push(`include "./acount/${file}"`)
  })
  fs.readdirSync(`${dataPath}/month`).forEach(file => {
    lines.push(`include "./month/${file}"`)
  })
  return lines;
}

// 初始化 conf.bean 和 index.bean 文件
[
  [`${dataPath}/conf.bean`, confLines.join('\r\n')],
  [`${dataPath}/index.bean`, indexLines()],
].forEach(fArray => {
  if (!fs.existsSync(fArray[0])) {
    fs.writeFileSync(fArray[0], fArray[1])
  }
})