const fs = require('fs');
const Cache = require('./cache');
const path = require('path')
const { getLedgerAccountTypesFilePath, getLedgerTransactionTemplateFilePath } = require('./path');
const { readFileByLines, lineToMap } = require('./utils');

const initAccountCache = (config) => {
  const beanAccountFiles = fs.readdirSync(`${config.dataPath}/account`)
  let dict = {}
  beanAccountFiles.forEach(beanAccountFile => {
    let fileAccounts = readFileByLines(`${config.dataPath}/account/${beanAccountFile}`).map(line => lineToMap(line))
    fileAccounts.forEach(acc => {
      if (dict[acc.account]) {
        dict[acc.account].commodity = acc.commodity
        if (acc.type === 'open') {
          dict[acc.account].startDate = acc.date
        } else {
          dict[acc.account].endDate = acc.date
        }
      } else {
        if (acc.type === 'open') {
          dict[acc.account] = { account: acc.account, startDate: acc.date, commodity: acc.commodity }
        } else {
          dict[acc.account] = { account: acc.account, endDate: acc.date, commodity: acc.commodity }
        }
      }
    })
  })
  Cache.Accounts[config.id] = Object.values(dict)
  console.log(`Success init cache: [${config.mail} accounts]`)

  const ledgerAccountTypeFilePath = getLedgerAccountTypesFilePath(config.dataPath)
  Cache.AccountTypes[config.id] = JSON.parse(fs.readFileSync(ledgerAccountTypeFilePath))
  console.log(`Success init cache: [${config.mail} accountTypes]`)
}

const initLedgerStructure = (config, exampleParentPath, dirs, files) => {
  for (let dir of dirs) {
    const dirPath = path.join(config.dataPath, dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
      console.log(`[${config.mail}] mkdir: ${dirPath}`)
    }
  }

  // 兼容旧版本，配置文件进行拷贝
  if (fs.existsSync(`${config.dataPath}/account_type.json`) && !fs.existsSync(getLedgerAccountTypesFilePath(config.dataPath))) {
    fs.copyFileSync(`${config.dataPath}/account_type.json`, getLedgerAccountTypesFilePath(config.dataPath));
    console.log(`[${config.mail}] Copy old file: ${getLedgerAccountTypesFilePath(config.dataPath)}`)
  }
  if (fs.existsSync(`${config.dataPath}/transaction_template.json`) && !fs.existsSync(getLedgerTransactionTemplateFilePath(config.dataPath))) {
    fs.copyFileSync(`${config.dataPath}/transaction_template.json`, getLedgerTransactionTemplateFilePath(config.dataPath));
    console.log(`[${config.mail}] Copy old file: ${getLedgerTransactionTemplateFilePath(config.dataPath)}`)
  }

  // 生成 months.bean 文件
  const monthsFilePath = path.join(config.dataPath, '/month/months.bean')
  if (!fs.existsSync(monthsFilePath)) {
    const monthFiles = fs.readdirSync(path.join(config.dataPath, '/month'))
    fs.writeFileSync(monthsFilePath, monthFiles.map(m => `include "./${m}"`).join('\r\n'))
    console.log(`[${config.mail}] create new file: ${monthsFilePath}`)
  }

  for (let file of files) {
    const filePath = path.join(config.dataPath, file)
    if (!fs.existsSync(filePath)) {
      let fileContent = fs.readFileSync(path.join(exampleParentPath, file)).toString()
      if (fileContent) {
        fileContent = fileContent.replace(/%startDate%/g, config.startDate)
      }
      fs.writeFileSync(filePath, fileContent)
      console.log(`[${config.mail}] create new file: ${filePath}`)
    }
  }
}


module.exports = {
  initAccountCache,
  initLedgerStructure
}