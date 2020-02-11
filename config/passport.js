const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//Load User Model
require('../models/User');
const User = mongoose.model('users');

module.exports = function(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(is, function(err, user) {
            done(err, user);
        })
    })

    passport.use(new localStrategy({
        usernamefield: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        //match user
        User.findOne({
            email: email
        }).then(user => {
            if(!user) {
                return done(null, false, {message: 'No User Found'});
            }

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Password Incorrect'})
                }
            })
        })
    }))
}