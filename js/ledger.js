const fs = require('fs');
const init = require('./init');
const { initAccountCache, initAccountTypesCache } = require('./account_service');
const Cache = require('./cache');
const config = require('../config/config.json');
const { getSha1Str } = require('./utils');
const { getLedgerConfigFilePath } = require('./path');

// 新建账本
const newLedger = ({ mail, secret, title, operatingCurrency, startDate }) => {
  const ledgerId = getSha1Str(mail + secret)
  init(ledgerId, mail, title, operatingCurrency, startDate)
  console.log(Cache.LedgerConfig[ledgerId])
  initAccountCache(Cache.LedgerConfig[ledgerId])
  initAccountTypesCache(Cache.LedgerConfig[ledgerId])
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