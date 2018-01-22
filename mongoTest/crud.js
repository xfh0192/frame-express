/**
 * 常用操作演示
 */

const User = require('./user')

// 插入
// Model#save([fn])
function insert () {
    let user = new User({
        username: 'fenghua',
        userpwd: 'abc',
        userage: 22,
        logindate: new Date()
    })

    user.save(function (err, res) {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log(`Res: ${res}`)
        }
    })
}
// insert();

// 更新
// Model.update(conditions, update, [options], [callback])
function update () {
    let wherestr = {'username': 'fenghua'}
    let updatestr = {'userpwd': 'abcd'}

    User.update(wherestr, updatestr, function (err, res) {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log(`Res: ${res}`)
        }
    })
}
// update()

// 删除
// Model.remove(conditions, [callback])
function remove () {
    let wherestr = {'username': 'fenghua'}
    let cb = function (err, res) {
        if (err) {
            console.log(`error: ${err}`)
        }
    }

    User.remove(wherestr, cb)
}

// 条件查询
// Model.find(conditions, [fields], [options], [callback])
function getByConditions () {
    let wherestr = {'username': 'fenghua'}
    // 第2个参数可以设置要查询输出的字段
    // 输出只会有username字段，1表示查询输出该字段，0表示不输出
    let opt = {'username': 1, '_id': 0}

    // 另。User.find({userage: {$gte: 21, $lte: 65}}, callback);    //这表示查询年龄大于等21而且小于等于65岁

    User.find(wherestr, opt, function (err, res) {
        // ...
    })
}

// 数量查询
// Model.count(conditions, [cb])
function getCountByConditions () {
    let wherestr = {}

    User.count(wherestr, function (err, res) {
        // ...
    })
}

// 根据 _id 查询
// Model.findById(id, [fields], [options], [callback])
function findById () {
    let id = '1234xxxxxxx'

    User.find(id, function () {
        // ....
    })
}

// 模糊查询
// 查询所有用户中有'm'的名字，不区分大小写。（正则匹配
function getByRegex () {
    let wherestr = {'username': {$regex: /m/i}}

    User.find(wherestr, cb)
}

// 分页查询
function getByPager () {
    let pageSize = 5                    // 一页多少条
    let currentPage = 1                 // 当前第几页
    let sort = {'logindate': -1}        // 排序(按登录时间倒序)
    let condition = {}                  // 条件
    let skipnum = (currentPage - 1) * pageSize      // 跳过数

    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            // ....
        }
    })
}