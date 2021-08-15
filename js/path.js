const getLedgerAccountTypesFilePath = dataPath => `${dataPath}/account_type.json`
const getLedgerConfigFilePath = dataPath => `${dataPath}/ledger_config.json`


module.exports = {
  getLedgerConfigFilePath,
  getLedgerAccountTypesFilePath,
}