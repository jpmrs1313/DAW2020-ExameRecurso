const mongoose = require('mongoose')

  var membroSchema = new mongoose.Schema({
    id: String,
    name: String,
    course:String,
    scores:[Number]
  })
  
  var equipaSchema = new mongoose.Schema({
    _id:String,
    guid:String,
    team:String,
    pitch1:Boolean,
    pitch2:Boolean,
    techPitch:Boolean,
    businessReport:Boolean,
    techReport:Boolean,
    members:[ membroSchema ]
  });

module.exports = mongoose.model('equipa', equipaSchema)
