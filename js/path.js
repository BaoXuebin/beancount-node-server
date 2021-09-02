const getLedgerAccountTypesFilePath = dataPath => `${dataPath}/account_type.json`
const getLedgerConfigFilePath = dataPath => `${dataPath}/ledger_config.json`
const getCommodityPriceFile = dataPath => `${dataPath}/price/price.bean`


module.exports = {
  getLedgerConfigFilePath,
  getLedgerAccountTypesFilePath,
  getCommodityPriceFile
}