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
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});