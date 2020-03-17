const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const  {registerValidation} = require('../validation/register');
const {loginValidation} = require('../validation/login');

router.post('/register', async (req, res) => {

    //data validation
    const {error} =  registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if user already exist
    try {
        const emailExist = await User.findOne({userMail : req.body.userMail});
        if(emailExist) return res.status(400).send('Email already exists.');
    } catch (err) {
        res.status(400).send(err);
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);



    //user creation
    const user = new User({
        userName: req.body.userName,
        userFirstName: req.body.userFirstName,
        userPseudo: req.body.userPseudo,
        userMail: req.body.userMail,
        userPassword: hashedPassword,
        isAdmin: false,
        isPrivate: false,
        isBan: false
    });

    //posting to db
    try {
        await user.save();
        await res.json({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {

    //data validation
    const {error} =  loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if email exists and if it's matching the password
    try {
        const user = await User.findOne({userMail : req.body.userMail});
        if(!user) return res.status(400).send('Email or password is wrong. EE');
        const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword);
        if(!validPassword) return res.status(400).send('Email or password is wrong. PP');
    } catch (err) {
        res.status(400).send(err);
    }

    res.send('Logged in');

});

module.exports = router;