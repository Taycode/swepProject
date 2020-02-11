const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const axios = require('axios');

//Load User Model
const User = require('../models/User');


//load Login page
router.get('/', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

//post login page
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email: email })
  if(!loginUser) {
    res.render('login', {
      message: 'Email is not registered. please proceed to signup'
    })
  }
  if (loginUser) {
    bcrypt.compare(password, loginUser.password, async (error, isMatch) => {
      if (error) throw error;
      if (isMatch) {
        jwt.sign({ email: loginUser.email }, 'cooldash', { expiresIn: '12h' }, (err, token) => {
          // console.log(token);
          res.cookie('auth', token, {expires: new Date(Date.now() + 900000)});
          // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
          req.user = loginUser;
          res.redirect('/dashboard');
        })
      } else {
        res.render('login', {
          message: 'wrong password'
        })
        // console.log('wrong password')
        // res.redirect('/login')
      }
    })
  } else {
    console.log('User not found')
    // res.redirect('/login');
  }
});

module.exports = router;
