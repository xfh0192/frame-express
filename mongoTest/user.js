/**
 * 1、schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；
 * 2、每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
 * 
 * demo：用户信息
 */

const mongoose = require('./db')

const Schema = mongoose.Schema

// 定义一个Schema
const UserSchema = new Schema({
    username: {type: String, index: true},          // index: 建索引
    userpwd: {type: String},
    userage: {type: Number},
    logindate: {type: Date, default: Date.now},    // 最近登录时间。default: 默认值
})

/**
 * 1、定义好了Schema，接下就是生成Model
 * 2、model是由schema生成的模型，可以对数据库的操作
 * 3、对上面的定义的user的schema生成一个User的model并导出:
 */

module.exports = mongoose.model('User',UserSchema)