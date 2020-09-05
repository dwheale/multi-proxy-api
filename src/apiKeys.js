const apiKeys = () => {
  const keys = new Map()
  const masterKey = process.env.MASTER_API_KEY || '12345'
  keys.set(masterKey, true)
  return keys
}


module.exports = apiKeys