const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const slowDown = require('express-slow-down')

// Setup rate limiter
const rateLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 60, // limit each IP to x requests per windowMS
})

// Setup speed limiter to slow down how quickly requests are made
const speedLimiter = slowDown({
  windowMs: 1000, // 1 seconds
  delayAfter: 2, // allow x request(s) per windowMs, then...
  delayMs: 500, // begin adding x ms of delay per request above delayAfter
})

require('dotenv').config()

const middlewares = require('./middlewares')
const apiv1 = require('./api')

const app = express()
app.set('trust proxy', 1)

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(rateLimiter)
app.use(speedLimiter)
app.use(middlewares.apiKeyHandler)

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', apiv1)


app.use(middlewares.notFound)
app.use(middlewares.errorHandler)


module.exports = app
