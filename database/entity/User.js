let Sequelize = require('sequelize')
let sequelize = require('../sequelize')

// 定义模型Pet，告诉Sequelize如何映射数据库表：
let User = sequelize.define('user', {
        // 自动增长的主键应该使用整型....
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING(100),
        account: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.STRING,

        test: Sequelize.STRING,
    }, {
        tableName: 'users',
        timestamps: false
    }
)

//     sequelize.define('user', {
//     // firstName: {
//     //     type: Sequelize.STRING
//     // },
//     // lastName: {
//     //     type: Sequelize.STRING
//     // }

//     // 自动增长的主键应该使用整型....
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: Sequelize.STRING(100),
//     account: Sequelize.STRING,
//     password: Sequelize.STRING,
//     createdAt: Sequelize.STRING,

//     // gender: Sequelize.BOOLEAN,
//     // birth: Sequelize.STRING(10),
//     // createdAt: Sequelize.BIGINT,
//     // updatedAt: Sequelize.BIGINT,
//     // version: Sequelize.BIGINT
// }, {
//     tableName: 'users',
//     timestamps: false
// });

module.exports = User