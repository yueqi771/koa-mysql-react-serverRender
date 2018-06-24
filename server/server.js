const Koa = require('Koa');
const mysql = require('mysql');
const route = require('koa-route');
const send = require('koa-send');
const path = require('path');

const app = new Koa();

//  链接mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "yueqisql"
})

connection.connect();

/* 插入数据 
const add_data = "INSERT INTO user(id, name, mobile, password, timezone, sex, description) VALUES(0, ?, ?, ?, ?, ?, ?)";
const data_params = ['越祈', '15066132753', '123456', '济南', '1', '流翼'];

connection.query(add_data, data_params, (err, result) => {
    if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------INSERT----------------------------');
    console.log(result)
    console.log('-----------------------------------------------------------------\n\n');
})
*/


// 查询数据

const sql = 'SELECT * FROM user';

app.use(require('./router/user.js').routes())


// 监听一个服务器
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PROT || 7007;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})