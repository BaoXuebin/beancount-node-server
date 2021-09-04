const fs = require('fs')
const { initAccountCache } = require('./init')

const dirFile = (config) => {
  const files = getFilePathFromDir(config.dataPath)
  return files.map(f => f.replace(`${config.dataPath}/`, '')).filter(f => !f.startsWith('bak/'))
}

const getFilePathFromDir = dir => {
  const files = fs.readdirSync(dir)
  let result = []
  files.forEach(file => {
    const fileStatus = fs.statSync(`${dir}/${file}`)
    if (fileStatus.isFile()) {
      result.push(`${dir}/${file}`)
    } else if (fileStatus.isDirectory()) {
      result = result.concat(getFilePathFromDir(`${dir}/${file}`))
    }
  })
  return result
}

const readFile = (config, path) => {
  return fs.readFileSync(`${config.dataPath}/${path}`).toString()
}

const writeFile = (config, path, content) => {
  if (config.isBak) {
    const filePath = `${config.dataPath}/${path}`
    const bakParentFile = `${config.dataPath}/bak`
    if (!fs.existsSync(bakParentFile)) {
      fs.mkdirSync(bakParentFile)
    }
    if (fs.existsSync(filePath)) {
      const fileName = path.replace('/', '_')
      const time = new Date().getTime()
      fs.writeFileSync(`${bakParentFile}/${time}_${fileName}`, fs.readFileSync(filePath))
    }
  }
  fs.writeFileSync(`${config.dataPath}/${path}`, content)

  initAccountCache(config);
}

module.exports = {
  dirFile, readFile, writeFile
}