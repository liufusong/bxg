const express = require('express');
 
const bodyParser =  require('body-parser');

const sql = require('mysql');
 
const fs = require('fs');
 
const path = require('path');
 
const app = express();

// const cookie = require('cookie-parser');
// app.use(cookie())
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/node_modules', express.static('./node_modules'))
const sqlObj = sql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'bxg'
})

const session = require('express-session')
app.use(session({
  secret: 'iuiouyyefefsdfsdwe097&^*(((', // 表示 用来对 SessionId 加密的 字符串，这个字符串，大家任意写
  resave: false, // 如果为 true ， 表示强制把 Session 存储到 物理磁盘上，从而保证Session不会丢失
  saveUninitialized: false // 如果为 true，表示 强制没有“初始化”的session 保存到storage中
}))
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Credentials',true)
    next();
});
app.post('/api/login',(req,res)=>{    
    const name = req.body.user_name;
    const password = req.body.password;
    console.log(name+'---'+password)
    const sqlStr = 'select * from  account where user_name="'+name+'" and password="'+password+'"';
    const obj = {};
    sqlObj.query(sqlStr,(err,data)=>{
        if(!data||data.length<1){
           obj.message = "对不起，用户名或者密码不正确";
           obj.tip = 0;
           obj.err_code = 0;        
        }else{
            obj.tip = 1;
           obj.message = data
           obj.err_code = 1;
        }     
        // req.session.sign = true;
        // req.session.name = '汇智网'   
        res.json(obj)     
    })
})
app.get('/login',(req,res)=>{
    console.log(req.session.name);//打印session的值
    res.send('welecome <strong>' + 123 + '</strong>, 欢迎你再次登录');
    // res.json({session:req.session})
    // var is;
    // if(!req.session.user){
    //     console.log('未登录')
    //     is = false;
    // }else{
    //     console.log(req.session.user)
    //     is = true;
    // }
    // console.log(req.session)
    // res.json({is}) 
})

// app.post('/api/login',  (req, res)=>{
//     req.session.sign = true;
//     req.session.name = '12312321'
//     res.end('欢迎登陆！');
// });
 
app.listen(2000,()=>{
console.log('running as http://127.0.0.1:2000')
})
