const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    console.log('into post')
    next()
})

router.post('/', function (req, res) {
    console.log('/')
    console.log(req)
    let data = {
        status: 'nice'
    }
    // res.send(data)
    res.json(data)
})

module.exports = router;