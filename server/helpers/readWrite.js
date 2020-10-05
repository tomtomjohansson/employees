const fs = require('fs')

const readFile = file => {
  const data = fs.readFileSync(file)
  return JSON.parse(data)
}

const writeFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

module.exports = {
  readFile,
  writeFile
}
