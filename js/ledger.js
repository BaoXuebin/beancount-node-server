const fs = require('fs');
const init = require('./init');
const { initAccountCache } = require('./account_service');
const crypto = require('crypto');
const Cache = require('./cache');

const initLedgerCache = () => {
  Cache.LedgerConfig = JSON.parse(fs.readFileSync('./config/ledger_config.json'))
}

// 新建账本
const newLedger = ({ mail, secret, title, operatingCurrency, startDate }) => {
  const shasum = crypto.createHash('sha1')
  // shasum.setEncoding("utf-8")
  shasum.update(mail + secret)
  const ledgerId = shasum.digest('hex')
  init(ledgerId, title, operatingCurrency, startDate)
  initAccountCache(Cache.LedgerConfig[ledgerId])
  return ledgerId
}

const getLedgerList = () => {
  const ledgers = JSON.parse(fs.readFileSync('./config/ledger_config.json'))
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