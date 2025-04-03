const express = require('express')
const { router: healthRouter } = require('./health.route')

const router = express.Router()

router.use('/ping', healthRouter)

module.exports = {
    router
}