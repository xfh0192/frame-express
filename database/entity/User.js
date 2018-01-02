let Sequelize = require('sequelize')
let sequelize = require('../sequelize')

// 定义模型Pet，告诉Sequelize如何映射数据库表：
let User = sequelize.define('user', {
    // firstName: {
    //     type: Sequelize.STRING
    // },
    // lastName: {
    //     type: Sequelize.STRING
    // }

    // 自动增长的主键应该使用整型....
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    createdAt: Sequelize.STRING,

    // gender: Sequelize.BOOLEAN,
    // birth: Sequelize.STRING(10),
    // createdAt: Sequelize.BIGINT,
    // updatedAt: Sequelize.BIGINT,
    // version: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = User