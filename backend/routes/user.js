const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/user' , (req,res,next) => {
  const data = req.body;
  User.findOne({ nodeid: data.userid}).then(r => {

    if(r.nodeid == data.userid){
      console.log('user exist')
      return res.status(404).json({
        message: 'user already exist'
      })
    }
  })
  .catch(err => {
    const post = new User({
      nodeid: data.userid,
      profileurl: data.name,
      bio: data.bio,
      location: data.location,
      type: data.type,
      publicrepos: data.publicrepos,
      gists:data.gists,
      followers: data.followers,
      following: data.following,
      created: data.created
    });
    post.save().then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: 'failed to save data'
      })
    })
  });
});


router.get('/details' , (req,res,next) => {

  User.find().then(result => {
    res.status(201).json(result);
  })
  .catch(err => {
    res.status(500).json({
      message: 'failed to save data'
    })
  })
});

module.exports = router;
