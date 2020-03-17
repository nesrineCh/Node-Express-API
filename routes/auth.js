const express = require('express');
const router = express.Router();
const User = require('../models/User');
const  {registerValidation} = require('../validation/register');

router.post('/register', async (req, res) => {

    //data validation
    const {error} =  registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //user creation
    const user = new User({
        userName: req.body.userName,
        userFirstName: req.body.userFirstName,
        userPseudo: req.body.userPseudo,
        userMail: req.body.userMail,
        userPassword: req.body.userPassword,
        isAdmin: false,
        isPrivate: false,
        isBan: false
    });

    //posting to db
    try {
        const savedUser = await user.save();
        await res.json(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;