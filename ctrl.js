const sqlObj = require('./module.js');
const fs = require('fs');
 
const path = require('path');
// 跨域
const access = (req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Credentials',true)
    next();
}

// 登录功能
const login = (req,res)=>{
    const name = req.body.user_name;
    const password = req.body.password;
    console.log(name+'---'+password)
    const sqlStr = 'select * from account where user_name="'+name+'" and password="'+password+'"';
    const obj = {};
    sqlObj.query(sqlStr,(err,data)=>{
        console.log(data)
        if(!data||data.length<1){
           obj.message = "对不起，用户名或者密码不正确";
           obj.tip = 0;
           obj.err_code = 0;        
        }else{
            obj.tip = 1;
           obj.message = data
           obj.err_code = 1;
        }     
        res.json(obj)     
    })
}

// 获取讲师列表
const getTeachenList = (req,res)=>{
    let sqlStr = 'select * from teacherlist'
    sqlObj.query(sqlStr,(err,data)=>{
        // console.log(data)
        res.json(data)
    })
}

// 添加讲师
const addTeacher = (req,res)=>{
    const tc = req.body;
    console.log(tc)
    const sqlStr = 'insert into teacherlist set ?'
    sqlObj.query(sqlStr,tc,(err,data)=>{
        const obj = {}
        if(!err){
            obj.status = 0;
        }else{
            obj.status = 1;
        }
        console.log(123)
        res.json(obj)
    })
}

// 获取讲师信息
const getgetTcInfo = (req,res)=>{
    console.log(req.params.id)
    const sqlStr = 'select * from teacherList where id=?'
    sqlObj.query(sqlStr,req.params.id,(err,data)=>{
        const obj = {}
        console.log(data)
        if(!err){
            obj.status = 0;
            obj.data = data;
        }else{
            obj.status = 1;
            obj.data = {}
        }
        res.json(obj)
        
    })
}

const postImg = (req,res,next)=>{
    console.log(req.file)
    fs.readFile(path.join(__dirname+'/uploads/'+req.file.filename),function(err,buf){
        console.log(buf)
        fs.writeFile(path.join(__dirname+'/public/'+req.file.filename+'.jpg'),buf,function(err){
            const sqlStr = 'update img set img_url=? where id=1';
            sqlObj.query(sqlStr,req.file.filename+'.jpg',(err,data)=>{
                res.json({status:0})
            })
        })
    })
}

const getImg = (req,res)=>{
    const sqlStr = 'select * from img where id=?'

    sqlObj.query(sqlStr,1,(err,data)=>{
        res.json(data)
    })
}

module.exports = {
    access,
    login,
    getTeachenList,
    addTeacher,
    getgetTcInfo,
    postImg,
    getImg
}
