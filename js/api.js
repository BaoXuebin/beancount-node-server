const dayjs = require('dayjs');
const fs = require('fs');
const process = require('child_process');
const { getSha1Str, getCommoditySymbol, log, unicodeStr } = require('./utils');
const { getCommodityPriceFile, getLedgerTransactionTemplateFilePath, getMonthsFilePath } = require('./path');
const Decimal = require('decimal.js')

const getLatest100Payee = (config) => {
  let bql = 'SELECT distinct payee order by date desc limit 100';
  const bqlResult = process.execSync(`bean-query "${config.dataPath}/index.bean" "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(r => r).map(r => {
    const rArray = r.trim().split(/\s+/)
    return rArray[0]
  })
}

const addEntry = (config, entry) => {
  let { date, payee, desc, entries } = entry
  let str = `\r\n${date} * "${payee || ''}" "${desc}"`;
  let autoBalance = false;
  entries.forEach(e => {
    const { account, amount, commodity, price, priceCommodity } = e
    str += `\r\n  ${account} ${Number(amount).toFixed(2)} ${commodity}`
    // 不涉及币种转换
    if (priceCommodity && commodity !== priceCommodity) {
      autoBalance = true
      if (amount >= 0) {
        str += ` {${price} ${priceCommodity}, ${date}}`
      } else {
        str += ` {} @ ${price} ${priceCommodity}`
      }
      fs.appendFileSync(getCommodityPriceFile(config.dataPath), `\r\n${date} price ${commodity} ${price} ${priceCommodity}`)
    }
  })
  if (autoBalance) {
    // 平衡小数点误差
    str += `\r\n  Equity:OpeningBalances`
  }

  const transactionMonth = dayjs(date).format("YYYY-MM");
  const monthBeanFile = `${config.dataPath}/month/${transactionMonth}.bean`;
  // 月度账单不存在，则创建
  if (!fs.existsSync(monthBeanFile)) {
    fs.writeFileSync(monthBeanFile, str)
    fs.appendFileSync(getMonthsFilePath(config.dataPath), `\r\ninclude "./${transactionMonth}.bean"`)
  } else {
    fs.appendFileSync(monthBeanFile, `\r\n${str}`)
  }
  return str;
}

const listItemByCondition = (config, { type, year, month }) => {
  let bql = `SELECT id, '\\', date, '\\', payee, '\\', narration, '\\', account, '\\', position, '\\'`;
  if (type || year || month) {
    bql += ' WHERE ';
    if (type) {
      bql += `account ~ '${type}' AND `
    }
    if (year) {
      bql += `year = ${year} AND `
    }
    if (month) {
      bql += `month = ${month} AND `
    }
    bql = bql.replace(new RegExp(' AND $'), ';');
  }
  const bqlResult = process.execSync(`bean-query "${config.dataPath}/index.bean" "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(r => r).map(r => {
    const rArray = r.replace(/\{(.+?)\}/, '').split('\\').map(a => a.trim())
    const amountAndCommodity = rArray[5].split(/\s+/)
    let result = {
      id: rArray[0],
      date: rArray[1],
      payee: rArray[2],
      desc: rArray[3],
      account: rArray[4]
    }
    if (amountAndCommodity) {
      if (amountAndCommodity[0]) {
        result['amount'] = amountAndCommodity[0]
      }
      if (amountAndCommodity[1]) {
        result['commodity'] = amountAndCommodity[1]
        result['commoditySymbol'] = getCommoditySymbol(amountAndCommodity[1])
      }
    }
    return result;
  }).filter(a => a).reverse()
}

const listAccountTransaction = (config, account) => {
  const bql = `select id, '\\', date, '\\', payee, '\\', narration, '\\', position, '\\', cost_number, '\\', cost(position), '\\', value(position), '\\', price, '\\'  where account ~ '${unicodeStr(account)}' order by date desc limit 100;`
  const cmd = `bean-query "${config.dataPath}/index.bean" "${bql}"`
  log(config.mail, cmd)
  const bqlResult = process.execSync(cmd).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(r => r).map(r => {
    // 去除币种转换的大括号 {}
    const rArray = r.trim().replace(/\{(.+?)\}/, '').split('\\').map(a => a.trim())
    const amountAndCommodity = rArray[4].split(/\s+/)
    const costAmountAndCommodity = rArray[6].split(/\s+/)
    const marketAmountAndCommodity = rArray[7].split(/\s+/)
    const saleAmountAndCommodity = rArray[8].split(/\s+/)
    let result = {
      id: rArray[0],
      date: rArray[1],
      payee: rArray[2],
      desc: rArray[3],
    }
    // 汇率
    if (rArray[5]) {
      result['costPrice'] = rArray[5]
    }
    if (amountAndCommodity) {
      if (amountAndCommodity[0]) {
        result['amount'] = amountAndCommodity[0]
      }
      if (amountAndCommodity[1]) {
        result['commodity'] = amountAndCommodity[1]
        result['commoditySymbol'] = getCommoditySymbol(amountAndCommodity[1])
      }
    }
    // 成本价
    if (costAmountAndCommodity) {
      if (costAmountAndCommodity[0]) {
        result['costAmount'] = costAmountAndCommodity[0]
      }
      if (costAmountAndCommodity[1]) {
        result['costCommodity'] = costAmountAndCommodity[1]
        result['costCommoditySymbol'] = getCommoditySymbol(costAmountAndCommodity[1])
      }
    }
    if (marketAmountAndCommodity) {
      if (marketAmountAndCommodity[0]) {
        result['marketAmount'] = marketAmountAndCommodity[0]
      }
      if (marketAmountAndCommodity[1]) {
        result['marketCommodity'] = marketAmountAndCommodity[1]
        result['marketCommoditySymbol'] = getCommoditySymbol(marketAmountAndCommodity[1])
      }
    }
    // 卖出价格
    if (saleAmountAndCommodity) {
      if (saleAmountAndCommodity[0]) {
        result['salePrice'] = saleAmountAndCommodity[0]
        if (result['amount']) {
          // 市场价
          result['saleAmount'] = Decimal(result['amount']).mul(Decimal(saleAmountAndCommodity[0]))
        }
      }
      if (saleAmountAndCommodity[1]) {
        result['saleCommodity'] = saleAmountAndCommodity[1]
        result['saleCommoditySymbol'] = getCommoditySymbol(saleAmountAndCommodity[1])
      }
    }
    return result
  }).filter(a => a)
}

const execCmd = cmd => process.execSync(cmd).toString()

const getTransactionTemplate = (config) => {
  const transactionTemplateFIlePath = getLedgerTransactionTemplateFilePath(config.dataPath)
  if (!fs.existsSync(transactionTemplateFIlePath)) {
    return []
  }
  return JSON.parse(fs.readFileSync(transactionTemplateFIlePath) || '[]')
}

const addTransactionTemplate = (config, template) => {
  template.id = getSha1Str(String(new Date().getTime()))
  const transactionTemplateFIlePath = getLedgerTransactionTemplateFilePath(config.dataPath)
  let oldTemplates = [];
  if (fs.existsSync(transactionTemplateFIlePath)) {
    oldTemplates = JSON.parse(fs.readFileSync(transactionTemplateFIlePath) || '[]')
  }
  oldTemplates.push(template)

  fs.writeFileSync(transactionTemplateFIlePath, JSON.stringify(oldTemplates))
  return template;
}

const deleteTransactionTemplate = (config, templateId) => {
  const transactionTemplateFIlePath = getLedgerTransactionTemplateFilePath(config.dataPath)
  let oldTemplates = JSON.parse(fs.readFileSync(transactionTemplateFIlePath) || '[]')
  oldTemplates = oldTemplates.filter(template => template.id !== templateId)
  fs.writeFileSync(transactionTemplateFIlePath, JSON.stringify(oldTemplates))
  return templateId;
}

module.exports = {
  getLatest100Payee,
  addEntry,
  listItemByCondition,
  listAccountTransaction,
  execCmd,
  addTransactionTemplate,
  getTransactionTemplate,
  deleteTransactionTemplate
}