const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/', async (req, res) => {
  const url = req.query.url
  console.log(url)
  const { data } = await axios.get(`${url}`)
  res.json({
    url: url,
    html: data
  })
})

module.exports = router
