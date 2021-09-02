const fs = require('fs');
const config = require('../config/config.json')
const initData = require('../config/init_data.json');
const DefaultAccountType = require('../config/account_type.json');
const Cache = require('./cache');
const { getLedgerAccountTypesFilePath, getLedgerConfigFilePath } = require('./path');

const init = (ledgerId, mail, title, operatingCurrency, startDate) => {
  let dataPath = config.dataPath
  if (ledgerId) {
    dataPath = `${config.dataPath}/${ledgerId}`
  }

  title = title || config.title
  operatingCurrency = operatingCurrency || config.operatingCurrency
  startDate = startDate || config.startDate

  // 初始化必须的文件结构
  const dirs = [
    config.dataPath, // 文件存储目录
    dataPath, // 账本存储目录
    `${dataPath}/account`,
    `${dataPath}/month`,
    `${dataPath}/price`
  ]

  const getAccounts = (accountKeys) => accountKeys.map(accountKey => `${config.startDate} open ${accountKey} ${config.operatingCurrency}`)
  const files = [
    [`${dataPath}/account/assets.bean`, getAccounts(initData.assets).join('\r\n')],
    [`${dataPath}/account/equity.bean`, getAccounts(initData.equity).join('\r\n')],
    [`${dataPath}/account/expenses.bean`, getAccounts(initData.expenses).join('\r\n')],
    [`${dataPath}/account/income.bean`, getAccounts(initData.income).join('\r\n')],
    [`${dataPath}/account/liabilities.bean`, getAccounts(initData.liabilities).join('\r\n')],
    [`${dataPath}/history.bean`, ''],
    [`${dataPath}/price/commodities.bean`, ''],
    [`${dataPath}/price/price.bean`, ''],
    [`${config.dataPath}/ledger_config.json`, "{}"],
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
    lines.push(`include "./history.bean"`)
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

  // 初始化账本配置
  const ledgerConfigFilePath = getLedgerConfigFilePath(config.dataPath)
  const ledgerConfig = JSON.parse(fs.readFileSync(ledgerConfigFilePath))
  ledgerConfig[ledgerId] = {
    id: ledgerId,
    mail,
    title,
    dataPath,
    operatingCurrency,
    startDate
  }
  fs.writeFileSync(ledgerConfigFilePath, JSON.stringify(ledgerConfig))
  console.log(`Create file: ${ledgerConfigFilePath}`)

  Cache.LedgerConfig = ledgerConfig
  console.log(`Success init ${mail} ledger config!`)

  // 创建 accountTypes
  const ledgerAccountTypesFilePath = getLedgerAccountTypesFilePath(dataPath)
  if (!fs.existsSync(ledgerAccountTypesFilePath)) {
    fs.writeFileSync(ledgerAccountTypesFilePath, JSON.stringify(DefaultAccountType))
    console.log(`Create file: ${ledgerAccountTypesFilePath}`)
  }
}

module.exports = init

