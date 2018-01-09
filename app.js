const express = require('express')
// const router = express.Router()
const app = express()

// 用于将 post 请求的body放进 req.body 中
const bodyParser = require('body-parser')

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。
// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const multer = require('multer')
const upload = multer()

app.use(function timeLog (req, res, next) {
    console.log('request started')
    next();
});

app.use('/api', require('./router/api'))

app.use('/post', require('./router/post'))

app.use('/sql', require('./router/getSql'))

// 同步model与数据库表
const sequelize = require('./database/sequelize')
sequelize.sync({alter: true})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('node success')
})

// test