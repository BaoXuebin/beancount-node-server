const fs = require('fs');
const init = require('./init');
const { initAccountCache } = require('./account_service');
const Cache = require('./cache');
const config = require('../config/config.json');
const { getSha1Str } = require('./utils');

const LedgerConfigFilePath = `${config.dataPath}/ledger_config.json`;

const initLedgerCache = () => {
  if (fs.existsSync(LedgerConfigFilePath)) {
    Cache.LedgerConfig = JSON.parse(fs.readFileSync(LedgerConfigFilePath))
  } else {
    Cache.LedgerConfig = {}
  }
}

// 新建账本
const newLedger = ({ mail, secret, title, operatingCurrency, startDate }) => {
  const ledgerId = getSha1Str(mail + secret)
  init(ledgerId, mail, title, operatingCurrency, startDate)
  initAccountCache(Cache.LedgerConfig[ledgerId])
  return ledgerId
}

const getLedgerList = () => {
  const ledgers = JSON.parse(fs.readFileSync(LedgerConfigFilePath))
  return Object.values(ledgers).map(l => {
    delete l.dataPath;
    return { id: l.id, title: l.title }
  })
}

module.exports = {
  initLedgerCache,
  newLedger,
  getLedgerList
}