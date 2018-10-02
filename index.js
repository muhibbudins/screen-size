const fs = require('fs')
const fetch = require('node-fetch')

const generate = async (string) => {
  /**
   * Create bracket for result
   */
  const result = []

  /**
   * Remove any new line and double space
   */
  const normalize = await string.replace(/\n|\s{2}/g, '')

  /**
   * Match any TR tag
   */
  const normalized = await normalize.match(/<tr[\s\S]*?<\/tr>/g)

  /**
   * Loop matching TR tag
   */
  await normalized.map(tableRow => {
    /**
     * Match all TD tag
     */
    const tableData = tableRow.match(/<td[\s\S]*?<\/td>/g)

    /**
     * Create temp variable
     */
    const bracket = {}

    /**
     * If match a TD tag
     */
    if (tableData) {
      /**
       * Loop all TD tag
       */
      return tableData.map(item => {
        /**
         * Get class name and content on TD tag
         */
        const classContent = /<td class="(.*)">(.*)<\/td>/g

        /**
         * Remove unuse attribute and content
         */
        const sanitize = item.replace(/<span[\s\S]*?><\/span>|data.+=/g, '')

        /**
         * Sanitize TD content
         */
        const content = classContent.exec(sanitize)

        /**
         * If has result, then push to temp variable
         */
        if (content && content[0]) {
          const key = content[1].split(' ')[0]
          bracket[key] = content[2]
        }

        /**
         * Send temp variable to result
         */
        result.push(bracket)

        return
      })
    }

    return
  })

  /**
   * Write temp file
   */
  fs.writeFileSync('device.json', JSON.stringify(result, false, 2))
}

/**
 * Scrap data from source
 */
fetch('http://screensiz.es/')
  .then(res => res.text())
  .then(string => {
    generate(string)
  })