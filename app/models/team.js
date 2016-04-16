var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
  name : String,
  type : String,
  description : String,
  leader : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  members : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});
module.exports = mongoose.model('Team', teamSchema);
