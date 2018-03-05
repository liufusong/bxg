const express = require('express');

const sql = require('mysql');
const sqlObj = sql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'bxg'
})

module.exports = sqlObj;