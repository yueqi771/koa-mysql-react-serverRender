# About
一个使用nodeJs + Koa + mysql做后端， react16 + mobx + react-router4 做前端的服务端渲染项目。 

核心是在node端形成一个可以即时运行js代码的沙箱， 通过运行webpack编译出来的js代码， 之后把react生成的dom元素插入到模版中， 最后返回给客户端

# 使用方法
```
进入项目目录，运行
  npm install
```

然后执行
```
  npm run dev: 启动客户端和服务端服务
  npm run build: 打包客户端和服务端代码
  npm run dev:client 运行客户端服务
  npm run dev:server 启动node端服务
  npm run build:client 打包客户端代码
  npm run build:server 打包服务端代码
```
架构思路
```
  node端：
    config： 数据库连接
    controller: 接口方法
    middlewares: 项目中间件
    mysql: 封装mysql常用的语句。
    router: 路由

```
