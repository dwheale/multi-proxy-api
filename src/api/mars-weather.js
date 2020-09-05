const express = require('express')
const axios = require('axios')


const router = express.Router()


const BASE_URL = 'https://api.nasa.gov/insight_weather/?'

// IN MEMORY CACHE
let cachedData
let cacheTime

// Middleware array
//let middleware = [limiter, speedLimiter]

router.get('/', async (req, res, next) => {
// router.get('/', ...middleware, middlewares.apiKeyHandler, async (req, res, next) => {
  if(cacheTime && cacheTime > Date.now() - 10 * 1000 * 60) {
    return res.json(cachedData)
  } else {
    try {
      const params = new URLSearchParams({
        api_key: process.env.NASA_API_KEY,
        feedtype: 'json',
        ver: '1.0'
      })
      // 1. make a request to the nasa api
      const { data } = await axios.get(`${BASE_URL}${params}`)
      // 2. respond to this request with data from the nasa api
      cachedData = data
      cacheTime = Date.now()
      data.cacheTime = cacheTime
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }


})

module.exports = router
