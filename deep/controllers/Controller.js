var dbConfig = require('../util/dbconfig')
let fs = require('fs')
//OK---登陆账号
login = (req, res) => {
  console.log('请求到达后端')
  let Personcount = req.query.count;
  let Personpassword = req.query.password;
  var sql = "select * from person where personcount=? and personpassword=?";
  var sqlArr = [Personcount, Personpassword];
  var callBack = (err, people) => {
    if (err) {
      res.send('查询失败')
    } else {
      res.send({
        'list1': people
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//OK---通过学号查看用户
getPerson = (req, res) => {
  let { personcount } = req.query
  var sql = `select * from person where personcount=?`
  var sqlArr = [personcount]
  var callBack = (err, data) => {
    if (err) {
      console.log('查找人员失败')
    } else {
      res.send({
        'list1': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
//OK---添加用户
addPerson = (req, res) => {
  let { personname, personcount, personpassword, role, pmjn_id, pdtm_id } = req.query
  var sql = "insert into person(personname,personcount,personpassword,role,pmjn_id,pdtm_id) value(?,?,?,?,?,?)"
  var sqlArr = [personname, personcount, personpassword, role, pmjn_id, pdtm_id]
  var callBack = (err, data) => {
    if (err) {
      console.log('添加用户失败')
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
delPerson = (req, res) => {
  let {id} = req.query
  var sql = `delete from person where id=?`
  var sqlArr = [id]
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
  let { majorname } = req.query
  var sql = `select * from major where majorname=?`
  var sqlArr = [majorname]
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
  let { majorname } = req.query
  var sql = `insert into major(majorname) value(?)`
  var sqlArr = [majorname]
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
  let {id} = req.query
  var sql = `delete from major where id=?`
  var sqlArr = [id]
  var callBack = (err, data) => {
    if (err) {
      console.log('删除专业失败')
    } else {
      res.send({
        'list1': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//OK---查询培养计划课程表
getplan = (req, res) => {
  let { yeartime, majorname } = req.query
  var sql = `
  select
  yeartime,
  major.majorname,
  sourse_encouding,
  classname,
  classcategory.classcategory,
  semeser.semesernumber,
  totalhours,
  teaching,
  experiment,
  practice,
  examination,
  Investigate,
  outline
  from teachingplan,major,semeser,classcategory
  where yeartime=? and major.majorname=?`
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

  if (req.file.length === 0) {
    res.render("error", {message: "上传文件不能为空！"});
    return
}else{
    let file = req.file
    fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname)
    
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });

    var imgurl = 'http://localhost:3000/uploads'+file.originalname}

  let { yeartime,
    sourse_encouding,
    classname,
    credit,
    totalhours,
    teaching,
    experiment,
    practice,
    examination,
    Investigate,
    pmjn_id,
    psn_id,
    pccn_id } = req.query
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
    imgurl,
    pmjn_id,
    psn_id,
    pccn_id]
  var callBack = (err, data) => {
    if (err) {
      console.log('插入失败')
    } else {
      res.send({
        'code':200,
        'msg':'插入成功',
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
}
delplan = (req, res) => {
  let {id} = req.query
  var sql = `delete from teachingplan where id=?`
  var sqlArr = [id]
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
  delplan
}