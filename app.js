const express = require('express');
 
const bodyParser =  require('body-parser');
 
const fs = require('fs');
 
const path = require('path');


 
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

const session = require('express-session')
app.use(session({
  secret: 'iuiouyyefefsdfsdwe097&^*(((', // 表示 用来对 SessionId 加密的 字符串，这个字符串，大家任意写
  resave: false, // 如果为 true ， 表示强制把 Session 存储到 物理磁盘上，从而保证Session不会丢失
  saveUninitialized: false // 如果为 true，表示 强制没有“初始化”的session 保存到storage中
}))


const router = require('./router.js')
app.use(router)




 
app.listen(2000,()=>{
console.log('running as http://127.0.0.1:2000')
})
