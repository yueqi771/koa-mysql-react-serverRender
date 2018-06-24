const mysql = require('mysql');
const config = require('../config/index.js');

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err)
            }else{
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    }else{
                        console.log('------------')
                        console.log(rows)
                        console.log('------------')
                        resolve( rows )
                    }

                    connection.release();
                })
            }
        })
    })
}

// 创建user表
let user = 
    `CREATE TABLE IF NOT EXISTS user(
        id INT(10) NOT NULL AUTO_INCREMENT  COMMENT '用户id',
        name VARCHAR(32) CHARACTER SET utf8 NOT NULL COMMENT '用户昵称',
        mobile CHAR(15) CHARACTER SET utf8 NOT NULL COMMENT '手机号',
        password VARCHAR(32) CHARACTER SET utf8 NOT NULL COMMENT '密码',
        timezone VARCHAR(36) CHARACTER SET utf8 COMMENT '地区',
        sex VARCHAR(10) CHARACTER SET utf8 COMMENT '性别',
        description VARCHAR(36) CHARACTER SET utf8 NOT NULL COMMENT '签名',
        PRIMARY KEY (id)
    );`

let createTable = (sql) => {
    return query(sql, []);
}

createTable(user)

// 注册用户
exports.insertUser = (value) => {
    let _sql = "insert into user set name=?, mobile=?, password=?, timezone=?, sex=?, description=?; "
    return query(_sql, value)
}

// 查找用户
exports.findUser = (id) => {
    let _sql = `select * from user where name=${id};`
    return query(_sql)
}