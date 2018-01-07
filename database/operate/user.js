const User = require('../entity/User')

// 根据账号密码，获取users表中所有匹配的数据
async function getValidUsers (data = {}) {
    let validUsers = await User.findAll({
        where: {
            account: data.account || '',
            password: data.password || ''
        }
    })
    return validUsers;
}



// let now = Date.now()

// 可以往数据库中塞一些数据了。我们可以用Promise的方式写：
let setUser = function (data) {
    // sync() : Sync all defined DAOs to the DB.
    // http://www.nodeclass.com/api/sequelize.html
    // return User.sync()
    //         .then(function () {
            let now = Date.now()
            return User.create({
                    // id: data.id,
                    name: data.name,
                    createdAt: now,
                    account: data.account,
                    password: data.password,
                    // name: 'Gaffey',
                    // gender: false,
                    // birth: '2007-07-07',
                    // createdAt: now,
                    // updatedAt: now,
                    // version: 0
                })
            // })
            .then(function (p) {
                console.log('created.' + JSON.stringify(p))
                // 这里返回的是新增的数据
                // return p
                // 这里返回所有账号的数据
                return User.findAll();
            })
            .catch(function (err) {
                console.log('failed: ' + err)
            })

            // 马克！！
            // 假如需要从model同步字段到table，可用sync({alter: true})
}

// or use async
// (async () => {
//     let dog = await User.create({
//         id: 'g-' + now,
//         name: 'Gaffey',
//         gender: false,
//         birth: '2007-07-07',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog))
// })

// 查询数据
let getUsers = async () => {
    // console.log(User);
    let users = await User.findAll({
        where: {
            // name: 'Gaffey'
        }
    });
    console.log(`find ${users.length} users:`);
    for (let u of users) {
        console.log(JSON.stringify(u))
    }
    
    return users;
}

// 更新数据，save方法
let saveUser = async () => {
    let user = await User.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(user)
    user.gender = true
    user.updatedAt = Date.now()
    user.version++
    await user.save()
}

// 删除数据，destroy


// 登录验证
let loginUser = async (data) => {
    let users = await getValidUsers(data)
    return users;
}

module.exports = {
    setUser,
    getUsers,
    saveUser,
    loginUser
}