const fetch = require('node-fetch')
const CONFIG = require('../../../config/env')

module.exports = async () => {
  const auth = Buffer.from(
    `${CONFIG.SIMPLYRETS_API_CREDENTIALS.USER}:${CONFIG.SIMPLYRETS_API_CREDENTIALS.TOKEN}`
  ).toString('base64')
  const response = await fetch(CONFIG.SIMPLYRETS_API, {
    headers: { Authorization: `Basic ${auth}` },
  })

  if (response.status >= 200 && response.status <= 299) {
    return await response.json()
  } else {
    console.log(response.status, response.statusText)
    // @ToDo: Retry, report failure to operations etc.
    return []
  }
}
