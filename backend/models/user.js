const mongoose = require('mongoose');
const userschema = mongoose.Schema({
  nodeid: {type: String},
  profileurl: {type: String},
  bio: {type: String},
  location: {type: String},
  type: {type: String},
  publicrepos: {type: String},
  gists: {type: String},
  followers: {type: String},
  following: {type: String},
  created: {type: String},

});

module.exports = mongoose.model('User', userschema);
