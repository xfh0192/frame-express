const express = require('express')
const router = express.Router()
const User = require('../database/operate/user')

router.post('/user/set', async () => {
    await user.setUser()
})

router.get('/user/get', async () => {
    await user.getUsers()
})

module.exports = router