const User = require('../entity/User')

let now = Date.now()

// 可以往数据库中塞一些数据了。我们可以用Promise的方式写：
let setUser = function () {
    User.create({
        id: 'g-' + now,
        name: 'Gaffey',
        gender: false,
        birth: '2007-07-07',
        createdAt: now,
        updatedAt: now,
        version: 0
    }).then(function (p) {
        console.log('created.' + JSON.stringify(p))
    }).catch(function (err) {
        console.log('failed: ' + err)
    })
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
            name: 'Gaffey'
        }
    });
    console.log(`find ${users.length} users:`);
    for (let u of users) {
        console.log(JSON.stringify(u))
    }
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


module.exports = {
    setUser,
    getUsers,
    saveUser
}