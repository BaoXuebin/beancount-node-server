const dayjs = require('dayjs');
const fs = require('fs');
const process = require('child_process');
const { getSha1Str, getCommoditySymbol } = require('./utils');

const getLatest100Payee = (config) => {
  let bql = 'SELECT distinct payee order by date desc limit 100';
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(r => r).map(r => {
    const rArray = r.trim().split(/\s+/)
    return rArray[0]
  })
}

const addEntry = (config, entry) => {
  let { date, payee, desc, entries } = entry
  let str = `\r\n${date} * "${payee || ''}" "${desc}"`;
  entries.forEach(e => {
    const { account, amount, commodity, price, priceCommodity } = e
    str += `\r\n  ${account} ${Number(amount).toFixed(2)} ${commodity}`
    // 不涉及币种转换
    if (priceCommodity && commodity !== priceCommodity) {
      str += ` {${price} ${priceCommodity}}`
    }
  })
  const transactionMonth = dayjs(date).format("YYYY-MM");
  const monthBeanFile = `${config.dataPath}/month/${transactionMonth}.bean`;
  // 月度账单不存在，则创建
  if (!fs.existsSync(monthBeanFile)) {
    fs.writeFileSync(monthBeanFile, str)
    fs.appendFileSync(`${config.dataPath}/index.bean`, `\r\ninclude "./month/${transactionMonth}.bean"`)
  } else {
    fs.appendFileSync(monthBeanFile, `\r\n${str}`)
  }
  return str;
}

const listItemByCondition = (config, { type, year, month }) => {
  let bql = 'SELECT id, date, payee, narration, account, position';
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
  const bqlResult = process.execSync(`bean-query ${config.dataPath}/index.bean "${bql}"`).toString()
  const bqlResultSet = bqlResult.split('\n').splice(2);
  return bqlResultSet.filter(r => r).map(r => {
    const rArray = r.trim().split(/\s+/)
    if (rArray.length === 7) {
      return {
        id: rArray[0],
        date: rArray[1],
        payee: rArray[2],
        desc: rArray[3],
        account: rArray[4],
        amount: rArray[5],
        commodity: rArray[6],
        commoditySymbol: getCommoditySymbol(rArray[6])
      }
    } else if (rArray.length === 6) {
      return {
        id: rArray[0],
        date: rArray[1],
        payee: '',
        desc: rArray[2],
        account: rArray[3],
        amount: rArray[4],
        commodity: rArray[5],
        commoditySymbol: getCommoditySymbol(rArray[5])
      }
    } else if (rArray.length > 7) { // narration 含有空格
      return {
        id: rArray[0],
        date: rArray[1],
        payee: rArray[2],
        desc: rArray.slice(3, rArray.length - 3).join(' '),
        account: rArray[rArray.length - 3],
        amount: rArray[rArray.length - 2],
        commodity: rArray[rArray.length - 1],
        commoditySymbol: getCommoditySymbol(rArray[rArray.length - 1])
      }
    }
    return null;
  }).filter(a => a).reverse()
}

const execCmd = cmd => process.execSync(cmd).toString()

const getTransactionTemplate = (config) => {
  const transactionTemplateFIlePath = `${config.dataPath}/transaction_template.json`
  if (!fs.existsSync(transactionTemplateFIlePath)) {
    return []
  }
  return JSON.parse(fs.readFileSync(transactionTemplateFIlePath) || '[]')
}

const addTransactionTemplate = (config, template) => {
  template.id = getSha1Str(String(new Date().getTime()))
  const transactionTemplateFIlePath = `${config.dataPath}/transaction_template.json`
  let oldTemplates = [];
  if (fs.existsSync(transactionTemplateFIlePath)) {
    oldTemplates = JSON.parse(fs.readFileSync(transactionTemplateFIlePath) || '[]')
  }
  oldTemplates.push(template)

  fs.writeFileSync(transactionTemplateFIlePath, JSON.stringify(oldTemplates))
  return template;
}

const deleteTransactionTemplate = (config, templateId) => {
  const transactionTemplateFIlePath = `${config.dataPath}/transaction_template.json`
  let oldTemplates = JSON.parse(fs.readFileSync(transactionTemplateFIlePath) || '[]')
  oldTemplates = oldTemplates.filter(template => template.id !== templateId)
  fs.writeFileSync(transactionTemplateFIlePath, JSON.stringify(oldTemplates))
  return templateId;
}

module.exports = {
  getLatest100Payee,
  addEntry,
  listItemByCondition,
  execCmd,
  addTransactionTemplate,
  getTransactionTemplate,
  deleteTransactionTemplate
}