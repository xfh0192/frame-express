const express = require('express')
const router = express.Router()
const user = require('../database/operate/user')

router.post('/user/set', async (req, res) => {
    let data = req.body
    let users = await user.setUser(data)

    res.send(users)
})

router.get('/user/get', async (req, res) => {
    console.log('getUsers')
    let users = await user.getUsers()
    
    res.json(users)
})

module.exports = router