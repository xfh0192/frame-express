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

