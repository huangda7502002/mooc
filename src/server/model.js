const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL,function (err) {
  if (!err) {
    console.log('数据库连接成功')
  } else {
    console.log(err)
  }
})

const models = {
  user: {
    'user': {type:String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    'avatar': {type: String},
    'desc': {type: String},
    'title': {type: String}
  },
  chat: {

  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}