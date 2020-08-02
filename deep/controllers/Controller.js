var dbConfig = require('../util/dbconfig')

let fs = require('fs')
//OK---登陆账号
login = (req, res) => {
  let  personcount= req.body.params.count
  let  personpassword= req.body.params.password
  var sql = `select * from person where personcount=? and personpassword=?`
  var sqlArr = [personcount,personpassword]
  var callBack = (err, data) => {
    if (err){
      console.log('登陆失败')
    } else {
      // console.log(res.data)
      res.send({
        'msg':"登陆成功",
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//OK---通过学号查看用户
getPerson = (req, res) => {
  console.log(req.body.params)
  let  personcount= req.body.params.count
  var sql = `select * from person where personcount=?`
  var sqlArr = [personcount]
  var callBack = (err, data) => {
    if (err) {
      console.log('查找人员失败')
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//OK---添加用户
addPerson = (req, res) => {
  let  personname= req.body.params.personname
  let  personcount= req.body.params.personcount
  let  personpassword= req.body.params.personpassword
  let  role= req.body.params.role
  let  pmjn_id= req.body.params.pmjn_id
  let  pdtm_id= req.body.params.pdtm_id            
  var sql = "insert into person(personname,personcount,personpassword,role,pmjn_id) value(?,?,?,?,?)"
  var sqlArr = [personname, personcount, personpassword, role, pmjn_id]
  var callBack = (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//OK---删除用户
delPerson = (req, res) => {
  let delnumber= req.body.params.delnumber
  console.log(delnumber)
  var sql = `delete from person where id=?`
  var sqlArr = [delnumber]
  var callBack = (err, data) => {
    if (err) {
      console.log('删除用户失败')
    } else {
      res.send({
        'list1': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//OK---通过专业名称查看专业信息
getmajor = (req, res) => {
  var sql = `select * from major`
  var sqlArr = []
  var callBack = (err, data) => {
    if (err) {
      console.log('查找专业名称失败')
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
addmajor = (req, res) => {
  let name = req.body.params.name
  var sql = `insert into major(majorname) value(?)`
  var sqlArr = [name]
  var callBack = (err, data) => {
    if (err) {
      console.log('添加专业失败')
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
delmajor = (req, res) => {
  let delnumber = req.body.params.delnumber
  console.log(delnumber)
  var sql = `delete from major where id=?`
  var sqlArr = [delnumber]
  var callBack = (err, data) => {
    if (err) {
      console.log("err")
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//OK---查询培养计划课程表
getplan = (req, res) => {
  let  yeartime= req.body.params.time
  let  majorname= req.body.params.name
  var sql = `
  select
  yeartime,
  major.majorname,
  sourse_encouding,
  classname,
  classcategory.classcategory,
  semeser.semesernumber,
  credit,
  totalhours,
  teaching,
  experiment,
  practice,
  examination,
  Investigate,
  outline
  from teachingplan,major,semeser,classcategory 
  where pmjn_id=major.id and psn_id=semeser.id and pccn_id=classcategory.id and yeartime=? and major.majorname=?`
  var sqlArr = [yeartime, majorname];
  var callBack = (err, data) => {
    if (err) {
      console.log('查找培养计划失败')
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//添加培养计划课程表
addplan = (req,res) => {
  let yeartime  = req.body.params.yeartime
  let sourse_encouding  = req.body.params.sourse_encouding
  let classname  = req.body.params.classname
  let credit  = req.body.params.credit
  let totalhours  = req.body.params.totalhours
  let teaching  = req.body.params.teaching
  let experiment  = req.body.params.experiment
  let practice  = req.body.params.practice
  let examination  = req.body.params.examination
  let Investigate  = req.body.params.investigate
  let outline  = req.body.params.outline
  let pmjn_id  = req.body.params.pmjn_id
  let psn_id  = req.body.params.psn_id
  let pccn_id  = req.body.params.pccn_id

  var sql = `insert into teachingplan(
      yeartime,
      sourse_encouding,
      classname,
      credit,
      totalhours,
      teaching,
      experiment,
      practice,
      examination,
      Investigate,
      outline,
      pmjn_id,
      psn_id,
      pccn_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  var sqlArr = [yeartime,
    sourse_encouding,
    classname,
    credit,
    totalhours,
    teaching,
    experiment,
    practice,
    examination,
    Investigate,
    outline,
    pmjn_id,
    psn_id,
    pccn_id]
  var callBack = (err, data) => {
    if (err) {
      console.log('插入失败')
    } else {
      res.send({
        'code':200,
        'msg':"插入成功"
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
delplan = (req, res) => {
  let delnumber = req.body.params.delnumber
  var sql = `delete from teachingplan where sourse_encouding=?`
  var sqlArr = [delnumber]
  var callBack = (err, data) => {
    if (err) {
      console.log('删除课程失败')
    } else {
      res.send({
        'list1': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//上传教学大纲接口
upoutline = (req, res) => {
  let file = req.file
  fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname)
  res.set({
      'content-type': 'application/json; charset=utf-8'
  });
  var imgurl = 'http://localhost:3000/uploads'+'/'+file.originalname
  res.send({
    'list':imgurl,
    'code':'200'
  })
}
//初始化下载教学大纲列表
outlinelist = (req, res) => {
  var sql = `select sourse_encouding,classname,outline from teachingplan`
  var sqlArr = []
  var callBack = (err, data) => {
    if (err) {
      console.log('初始化教学大纲列表失败')
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//删除教学大纲
deloutline = (req, res) => {
  let delnumber = req.body.params.delnumber
  var sql = `update teachingplan SET outline ='' where sourse_encouding=?`
  var sqlArr = [delnumber]
  var callBack = (err, data) => {
    if (err) {
      console.log('删除课程失败')
    } else {
      res.send({
        'list1': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
  login,
  getPerson,
  addPerson,
  delPerson,
  getmajor,
  addmajor,
  delmajor,
  getplan,
  addplan,
  delplan,
  upoutline,
  outlinelist,
  deloutline
}