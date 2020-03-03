const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  const user = new User({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    isAdmin: req.body.isAdmin,
    isPrivate: req.body.isPrivate,
  });

  user.save()
  .then(data => {
    res.json(data);
  }).catch(err => {
    res.json({err});
  });

});

module.exports = router;
