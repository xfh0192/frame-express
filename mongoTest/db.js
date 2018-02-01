/**
 * https://www.cnblogs.com/zhongweiv/p/mongoose.html
 */


const mongoose = require('mongoose')

const dbURL = 'mongodb://localhost:27017/test'

/**
 * 连接
 */
const db = mongoose.connect(dbURL)

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log(`Mongoose connection open to ${dbURL}`);
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log(`Mongoose connection error: ${err}`)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log(`Mongoose connection disconnected`)
})

module.exports = mongoose