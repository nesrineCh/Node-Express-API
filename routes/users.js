const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const user = new User({
    userName: req.body.userName,
    userFirstName: req.body.userFirstName,
    userPseudo: req.body.userPseudo,
    userMail: req.body.userMail,
    userPassword: req.body.userPassword,
    isAdmin: req.body.isAdmin,
    isPrivate: req.body.isPrivate,
    isBan: req.body.isBan,
  });

  try{
    const savedUser = await user.save();
    await res.json(savedUser);
  }catch (err) {
    await res.json({message: err});
  }

  /*
  user.save()
  .then(data => {
    res.json(data);
  }).catch(err => {
    res.json({err});
  });
  */
});

module.exports = router;
