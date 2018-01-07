const Sequelize = require('sequelize')
const config = require('./config')

// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471955049232be7492e76f514d45a2180e2c224eb7a6000
// 创建一个sequelize对象实例：
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    define: {
        timestamps: false
    }
})

sequelize
.sync()
// .sync({force: true})
.then(function () {
    console.log('sync done')
})

module.exports = sequelize;