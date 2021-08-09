const fs = require('fs');
const config = require('../config/config.json')
const initData = require('../config/init_data.json')

const dataPath = config.dataPath;

// 初始化必须的文件结构
const dirs = [
  dataPath,
  `${dataPath}/account`,
  `${dataPath}/month`,
  'cache',
]

const getAccounts = (accountKeys) => accountKeys.map(accountKey => `${config.startDate} open ${accountKey} ${config.operatingCurrency}`)
const files = [
  [`${dataPath}/account/assets.bean`, getAccounts(initData.assets).join('\r\n')],
  [`${dataPath}/account/equity.bean`, getAccounts(initData.equity).join('\r\n')],
  [`${dataPath}/account/expenses.bean`, getAccounts(initData.expenses).join('\r\n')],
  [`${dataPath}/account/income.bean`, getAccounts(initData.income).join('\r\n')],
  [`${dataPath}/account/liabilities.bean`, getAccounts(initData.liabilities).join('\r\n')],
  ['cache/accounts.json', "[]"],
]

// index.bean 初始化内容
const indexLines = () => {
  let lines = [
    `option "title" "${config.title}"`,
    `option "operating_currency" "${config.operatingCurrency}"`,
    'option "render_commas" "TRUE"',
    '',
    `${config.startDate} custom "fava-option" "interval" "day"`,
    `${config.startDate} custom "fava-option" "language" "zh_CN"`,
    ''
  ];
  fs.readdirSync(`${dataPath}/account`).forEach(file => {
    lines.push(`include "./account/${file}"`)
  })
  fs.readdirSync(`${dataPath}/month`).forEach(file => {
    lines.push(`include "./month/${file}"`)
  })
  lines.push('')
  return lines;
}

const init = () => {
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
  // 初始化 conf.bean 和 index.bean 文件
  const beanFiles = [
    [`${dataPath}/index.bean`, indexLines().join('\r\n')]
  ]
  beanFiles.forEach(fArray => {
    if (!fs.existsSync(fArray[0])) {
      fs.writeFileSync(fArray[0], fArray[1])
    }
  })
  console.log("Success init!")
}

module.exports = init

