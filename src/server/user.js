const express = require('express')
const utils = require('utility')
const Router = express.Router()

const model = require('./model')
const User = model.getModel('user')

const _filter = {'pwd':0,'_v':0}

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_397x8yza6?2#'
  return utils.md5(utils.md5(pwd+salt))
}

Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code:1})
  } else {
    User.findOne({_id:userid},_filter, function(err,doc) {
      if(err) {
        return res.json({code:1,msg:'后端出错了'})
      } else {
        return res.json({code:0,msg:'登录成功',data:doc})
      }
    })
  }
})

Router.post('/register', function (req, res) {
  const {user,pwd,type} = req.body
  User.findOne({user:user},function(err,doc) {
    if(doc) {
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({user,pwd:md5Pwd(pwd),type})
    userModel.save(function(e,d) {
      if (e) {
        return res.json({code:1,msg:'后端出错了'})
      }

      const {user,type,_id} = d
      res.cookie('userid',_id)
      return res.json({code:0,msg:'注册成功',data:{user,type,_id}})
    })
  })
})

Router.post('/login', function (req, res) {
  let {user,pwd} = req.body
  pwd = md5Pwd(pwd)
  User.findOne({user,pwd},_filter,function(err,doc) {
    if(doc) {
      res.cookie('userid',doc._id)
      return res.json({code:0,data:doc,msg:'登录成功'})
    } else {
      return res.json({code:1,msg:'登录失败'})
    }
  })
})

Router.post('/update', function(req,res) {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err, doc) {
    const data = Object.assign({},{user:doc.user,type:doc.type},body)
    return res.json({code:0,data})
  })
})

Router.get('/list', function (req, res){
  User.find({}, function(err,doc) {
    return res.json(doc)
  })
})

module.exports = Router