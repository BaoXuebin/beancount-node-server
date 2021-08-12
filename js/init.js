const fs = require('fs');
const config = require('../config/config.json')
const initData = require('../config/init_data.json');
const Cache = require('./cache');

const init = (ledgerId, title, operatingCurrency, startDate) => {
  let dataPath = config.dataPath
  if (ledgerId) {
    dataPath = `${config.dataPath}/${ledgerId}`
  }

  title = title || config.title
  operatingCurrency = operatingCurrency || config.operatingCurrency
  startDate = startDate || config.startDate

  // 初始化必须的文件结构
  const dirs = [
    config.dataPath,
    dataPath,
    `${dataPath}/account`,
    `${dataPath}/month`,
  ]

  const getAccounts = (accountKeys) => accountKeys.map(accountKey => `${config.startDate} open ${accountKey} ${config.operatingCurrency}`)
  const files = [
    [`${dataPath}/account/assets.bean`, getAccounts(initData.assets).join('\r\n')],
    [`${dataPath}/account/equity.bean`, getAccounts(initData.equity).join('\r\n')],
    [`${dataPath}/account/expenses.bean`, getAccounts(initData.expenses).join('\r\n')],
    [`${dataPath}/account/income.bean`, getAccounts(initData.income).join('\r\n')],
    [`${dataPath}/account/liabilities.bean`, getAccounts(initData.liabilities).join('\r\n')],
  ]

  // index.bean 初始化内容
  const indexLines = () => {
    let lines = [
      `option "title" "${title}"`,
      `option "operating_currency" "${operatingCurrency}"`,
      'option "render_commas" "TRUE"',
      '',
      `${startDate} custom "fava-option" "interval" "day"`,
      `${startDate} custom "fava-option" "language" "zh_CN"`,
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

  const ledgerConfig = JSON.parse(fs.readFileSync('./config/ledger_config.json'))
  ledgerConfig[ledgerId] = {
    id: ledgerId,
    secret: "",
    title,
    dataPath,
    operatingCurrency,
    startDate
  }
  fs.writeFileSync('./config/ledger_config.json', JSON.stringify(ledgerConfig))
  Cache.LedgerConfig = ledgerConfig

  console.log("Success init!")
}

module.exports = init

