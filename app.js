const express = require('express');
 
const bodyParser =  require('body-parser');

const sql = require('mysql');
 
const fs = require('fs');
 
const path = require('path');
 
const app = express();

const cookie = require('cookie-parser');
app.use(cookie())
const cors = require('cors');

const session = require('express-session');  
app.use(session({  
    resave: true, // don't save session if unmodified  
    saveUninitialized: false, // don't create session until something stored  
    secret: 'dafdsafdsfdsaf'  
}));  

app.use(cors())
 
app.use(bodyParser.urlencoded({ extended: false }))

const sqlObj = sql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'bxg'
})
// app.all('*',function(req,res,next){
//     res.header('Access-Control-Allow-Origin','http://localhost:8080');
//     res.header('Access-Control-Allow-Credentials',true)
//     next();
// });
app.post('/api/login',(req,res)=>{    
    const name = req.body.user_name;
    const password = req.body.password;
    console.log(name+'---'+password)
    const sqlStr = 'select * from  account where user_name="'+name+'" and password="'+password+'"';
    const obj = {};
    sqlObj.query(sqlStr,(err,data)=>{
        if(!data||data.length<1){
           obj.message = '对不起，账号名和密码不正确';
           obj.err_code = 0;
          
        }else{
           obj.message = data
           obj.err_code = 1;
           req.session.user = data   
           res.cookie('user', data, { expires: new Date(Date.now() + 900000), httpOnly: true });
           console.log(req.cookies.resc)
        }                    
        res.json(obj)     
    })
    
})
app.get('/sec',(req,res)=>{
    res.cookie('user', '123', { expires: new Date(Date.now() + 900000), httpOnly: true });
    console.log(req.cookies)
    res.json(req.cookies)
})
app.get('/api/islogin',(req,res)=>{
   console.log(req.cookies)
    res.json({cookie:req.cookies})
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


 
app.listen(2000,()=>{
console.log('running as http://127.0.0.1:2000')
})
