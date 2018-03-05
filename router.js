const express = require('express');

const ctrl = require('./ctrl.js')

const app = express();
// 跨域
const cors = require('cors');
app.use(cors())

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.all('*',ctrl.access);

router.post('/api/login',ctrl.login);

router.get('/api/techerList',ctrl.getTeachenList);

router.post('/api/addTeacher',ctrl.addTeacher);

router.get('/api/getTcInfo/:id',ctrl.getgetTcInfo);

router.post('/api/postImg', upload.single('avatar'),ctrl.postImg);

router.get('/api/getImg',ctrl.getImg)

module.exports = router;