const getLedgerConfigFilePath = dataPath => `${dataPath}/ledger_config.json`

const getLedgerAccountTypesFilePath = dataPath => `${dataPath}/.beancount-ns/account_type.json`
const getLedgerTransactionTemplateFilePath = dataPath => `${dataPath}/.beancount-ns/transaction_template.json`

const getCommodityPriceFile = dataPath => `${dataPath}/price/prices.bean`
const getMonthsFilePath = dataPath => `${dataPath}/month/months.bean`


module.exports = {
  getLedgerConfigFilePath,
  getLedgerAccountTypesFilePath,
  getCommodityPriceFile,
  getLedgerTransactionTemplateFilePath,
  getMonthsFilePath
}