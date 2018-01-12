
/**
 * 该处是用于测试单表的操作
 * 情景：账号注册/登录
 */

const express = require('express')
const router = express.Router()
const user = require('../database/operate/user')

// 注册一个账号
router.post('/user/set', async (req, res) => {
    let data = req.body
    let users = await user.setUser(data)

    res.send(users)
})

// 获取所有账号
router.get('/user/get', async (req, res) => {
    console.log('getUsers')
    let users = await user.getUsers()
    
    res.json(users)
})

// 注册（插入）一个账号数据进表
router.post('/user/login', async (req, res) => {
    console.log('check login')
    let users = await user.loginUser(req.body)

    // console.log(users)
    // 唯一的判断，在注册的时候判断就好
    // 此处专注于判断账号是否存在
    let response = {};
    if (users.length) {
        response.result = true;
        response.message = '登录成功';
    } else {
        response.result = false;
        response.message = '登录失败，该账号不存在';
    }
    res.send(response);
})

module.exports = router