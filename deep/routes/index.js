var express = require('express');
let fs = require('fs')
let multer = require('multer')
var path = require('path');
var router = express.Router();
var controller = require('../controllers/Controller')
var upload = multer({ dest: './public/uploads/'}).single('file')

//登陆
router.get('/login',controller.login);

//查找用户信息
router.get('/getPerson',controller.getPerson);
//添加用户
router.post('/addPerson',controller.addPerson);
//删除用户
router.post('/delPerson',controller.delPerson);


//查找专业信息
router.get('/getmajor',controller.getmajor);
// //添加专业信息
router.post('/addmajor',controller.addmajor) 
// //删除专业信息
router.post('/delmajor',controller.delmajor)

//查找培养计划
router.post('/getplan',controller.getplan);
// //添加培养计划
router.post('/addplan',upload,controller.addplan)
// //删除培养计划
router.post('/delplan',controller.delplan)

module.exports = router;
