const fs = require('fs');
const { initLedgerStructure, initAccountCache } = require('./init');
const Cache = require('./cache');
const config = require('../config/config.json');
const { getSha1Str, getAllDirFiles, log } = require('./utils');
const { getLedgerConfigFilePath } = require('./path');

// 新建账本
const newLedger = ({ mail, secret, title = config.title, operatingCurrency = config.operatingCurrency, startDate = config.startDate }) => {
  const ledgerId = getSha1Str(mail + secret)
  // 初始化账本配置
  const ledgerConfigFilePath = getLedgerConfigFilePath(config.dataPath)
  const ledgerConfig = JSON.parse(fs.readFileSync(ledgerConfigFilePath))
  const dataPath = `${config.dataPath}/${ledgerId}`
  ledgerConfig[ledgerId] = {
    id: ledgerId,
    mail,
    title,
    dataPath,
    operatingCurrency,
    startDate,
    isBak: config.isBak
  }
  fs.writeFileSync(ledgerConfigFilePath, JSON.stringify(ledgerConfig))
  log(config.mail, `Create file: ${ledgerConfigFilePath}`)
  Cache.LedgerConfig = ledgerConfig
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath)
  }
  log(config.mail, `Success init ledger config`)

  // 初始化 beancount 账本文件结构
  const { dirs, files } = getAllDirFiles('./example')
  initLedgerStructure(ledgerConfig[ledgerId], './example', dirs, files);
  // 初始化 account 和 accountType 缓存
  initAccountCache(ledgerConfig[ledgerId]);
  return ledgerId
}

const getLedgerList = () => {
  const ledgers = JSON.parse(fs.readFileSync(getLedgerConfigFilePath(config.dataPath)))
  return Object.values(ledgers).map(l => {
    delete l.dataPath;
    return { id: l.id, title: l.title }
  })
}

module.exports = {
  newLedger,
  getLedgerList
}