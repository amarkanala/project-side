const fetchProperties = require('../fetchProperties')
const fetch = require('node-fetch')
const mockProperties = require('../../mock/properties')

jest.mock('node-fetch', () => {
  return jest.fn().mockImplementation(() => mockProperties)
})
const CONFIG = {
  SIMPLYRETS_API: 'https://api.simplyrets.com/properties',
  SIMPLYRETS_API_CREDENTIALS: {
    USER: 'simplyrets',
    TOKEN: 'simplyrets',
  },
}
const authKey = 'c2ltcGx5cmV0czpzaW1wbHlyZXRz'

describe('favProperties util', () => {
  test('favProperties returns a key value map of fav peoperties', async () => {
    const properties = await fetchProperties()
    const headers = {
      headers: { Authorization: `Basic ${authKey}` },
    }
    expect.assertions(1)
    expect(fetch).toBeCalledWith(CONFIG.SIMPLYRETS_API, headers)
  })
})
