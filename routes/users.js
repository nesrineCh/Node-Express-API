const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    await res.json(users);
  } catch (err) {
    await res.json({message: err});
  }
});

/* GET a specific user */
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({_id : id});
    await res.json(user);
  } catch (err) {
    await res.json({message: err});
  }
});

/* POST new users */
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
    isBan: req.body.isBan
  });

  try{
    const savedUser = await user.save();
    await res.json(savedUser);
  }catch (err) {
    await res.json({message: err});
  }

});

/* DELETE a specific user */
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.deleteOne({_id : id});
    await res.json(deletedUser);
  } catch (err) {
    await res.json({message: err});
  }
});

/* PATCH  a specific user */
router.

module.exports = router;
