const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const flash = require('flash');
const axios = require('axios');


// Load User Model
const User = require('../models/User');;

//ngrok url
const urlDjangoPost = 'http://cooldashapi.herokuapp.com/account/signup/'

// Load Signup Page
router.get('/', (req, res) => {
  res.render('signup', {
    title: 'Signup'
  });
});

//POST - get signup details
router.post('/', async (req, res) => {
  // console.log(req.body);
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    terms: req.body.terms
  });

  const toSendUser = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  }

  // const postUser = await axios.post(urlDjangoPost, newUser).catch(err => {
  //   console.log(err);
  // });

  // if(postUser) {
  //   console.log('success')
  // } else {
  //   console.log('failure')
  // }

  axios.post(urlDjangoPost, toSendUser)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  if (newUser.password.length < 8) {
    res.render('signup', {
      message: 'Password must be atleat 8 characters',
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      terms: newUser.terms
    })
  }

  User.findOne({ 'email': newUser.email }, 'email', (err, user) => {
    if (err) return err;
    if (user) {
      res.render('signup', {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        message: 'Email already registered'
      })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              // console.log(user)
              res.redirect('/login');
            })
            .catch(err => {
              console.log(err);
              return;
            })
        })
      })
    }
  })
});


module.exports = router;