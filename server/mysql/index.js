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
        wechat VARCHAR(32) CHARACTER SET utf8 COMMENT '微信',
        description VARCHAR(36) CHARACTER SET utf8 NOT NULL COMMENT '签名',
        PRIMARY KEY (id)
    );`

let article = 
    `CREATE TABLE IF NOT EXISTS article(
        id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
        thumb VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章封面',
        title VARCHAR(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标题',
        description VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '文章描述',
        type TINYINT(4) UNSIGNED NOT NULL DEFAULT '1',
        author VARCHAR(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
        uid INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '作者id',
        content TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章内容',
        clicks INT(10) UNSIGNED NOT NULL COMMENT '浏览量',
        addtime INT(10) UNSIGNED NOT NULL COMMENT '添加时间',
        status TINYINT(4) UNSIGNED NOT NULL DEFAULT '1' COMMENT '0-删除 1-正常',
        PRIMARY KEY (ID)
    )`

let createTable = (sql) => {
    return query(sql, []);
}

createTable(user);
createTable(article)

// 注册用户
exports.insertUser = (value) => {
    let _sql = "insert into user set name=?, mobile=?, password=?, timezone=?, wechat=?, description=?; "
    return query(_sql, value)
}

// 查找用户
exports.findUser = (mobile) => {
    let _sql = `select * from user where mobile=${mobile};`
    return query(_sql)
}

// 插入文章
exports.inserArticle = (value) => {
    let _sql = "insert into article set thumb=?, title=?, description=?, type=?, author=?, content=?, clicks=0, addtime=?";
    return query(_sql, value)
}