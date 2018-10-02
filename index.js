const fs = require('fs')
const fetch = require('node-fetch')

const generate = async (string) => {
  const result = []
  const rep = await string.replace(/\n|\s{2}/g, '')
  const res = await rep.match(/<tr[\s\S]*?<\/tr>/g)
  const ret = await res.map(line => {
    const get = line.match(/<td[\s\S]*?<\/td>/g)
    const bracket = {}

    if (get) {
      return get.map(item => {
        const regex = /<td class="(.*)">(.*)<\/td>/g
        const sanitize = item.replace(/<span[\s\S]*?><\/span>|data.+=/g, '')
        const res = regex.exec(sanitize)

        if (res && res[0]) {
          const key = res[1].split(' ')[0]
          bracket[key] = res[2]
        }

        result.push(bracket)
        return
      })
    }

    return
  })

  fs.writeFileSync('device.json', JSON.stringify(result, false, 2))
}

fetch('http://screensiz.es/')
  .then(res => res.text())
  .then(string => {
    generate(string)
  })