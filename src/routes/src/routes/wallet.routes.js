const express = require('express')
const router = express.Router()

const { getBalance } = require('../../modules/wallet/wallet.controller')
const auth = require('../middleware/auth')

router.get('/wallet/balance', auth, getBalance)

module.exports = router
