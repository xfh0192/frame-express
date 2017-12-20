var express = require('express')
var router = express.Router()

// 该路由的中间件
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next();
});

// 定义路由
router.get('/', function (req, res) {
    console.log('this is api');
    let data = {
        message: 'this is api'
    }
    res.send(data);
});

router.get('/hi', function (req, res) {
    console.log('this is hi');
    res.send('this is hi');
});

module.exports = router;