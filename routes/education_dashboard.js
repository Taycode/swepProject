const express = require('express');
const router = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/' ,(req, res) => {
    let cookies = req.cookies.auth;
    // console.log(typeof cookies)
    if(cookies == null || cookies == undefined) {
        res.render('login', {
            message: 'You are not authorised, login'
        })
    } else {
        let url = 'http://7aff9fbe.ngrok.io/education/course/search/';
        let logged_in_data = jwt.verify(cookies, 'cooldash');
        let user_email = logged_in_data.email;
        let user = {};
        User.findOne({email: user_email}, 'firstname lastname', (err, res_user)=>{
            user.firstname = res_user.firstname;
            user.lastname = res_user.lastname;
        });

        console.log(user);
        request({
            url: url,
            json: true
        }, (error, response, body)=>{
            res.render('education/books', {
                title: 'Education',
                body: body,
                user:user
            });
        });

    }

});

router.get('/past_question', (req, res) => {
    res.render('education/pq');
    // res.send('shey o need pq ni');
});

router.get('/books', (req, res) => {

    res.redirect('/education/')
    // res.send('iwe ogba !!!');
});

router.get('/tutorial_videos', (req, res) => {
    res.render('education/videos');
    // res.send('shey wa wo porn');
});

router.get('/gp_calculator', (req, res) => {
    res.render('education/gp_calculator');
});

router.get('/forum', (req, res) => {
    res.render('education/forum')
});

router.get('/books/:course_code', (req, res) => {
    let course_code = req.params.course_code;
    let cookies = req.cookies.auth;
    // console.log(typeof cookies)
    if(cookies == null || cookies == undefined) {
        res.render('login', {
            message: 'You are not authorised, login'
        })
    } else {
        let url = `http://7aff9fbe.ngrok.io/education/course/${course_code}/`;
        let logged_in_data = jwt.verify(cookies, 'cooldash');
        let user_email = logged_in_data.email;
        let user = {};
        let search_result = '';
        User.findOne({email: user_email}, 'firstname lastname', (err, res_user)=>{
            user.firstname = res_user.firstname;
            user.lastname = res_user.lastname;
        });

        console.log(user);
        request({
            url: url,
            json: true
        }, (error, response, res_body)=>{
            request({
                url: 'http://7aff9fbe.ngrok.io/education/course/search/',
                json: true
            }, (error, response, body)=>{
                 search_result = body;
                res.render('education/_book_description', {
                    title: 'Education',
                    body: res_body,
                    user:user,
                    search_result: search_result
                });

            });
        });

    }

});






//
// router.get('/books/CPE311', (req, res) => {
//     res.render('education/books/course/CPE311', {
//         title: 'CPE311'
//     })
// })
//
// router.get('/books/CPE301', (req, res) => {
//     res.render('education/books/course/CPE301', {
//         title: 'CPE301'
//     })
// })
//
// router.get('/books/CSC305', (req, res) => {
//     res.render('education/books/course/CSC305', {
//         title: 'CSC305'
//     })
// })
//
// router.get('/books/CSC307', (req, res) => {
//     res.render('education/books/course/CSC307', {
//         title: 'CSC307'
//     })
// })
//
// router.get('/books/CSC315', (req, res) => {
//     res.render('education/books/course/CSC315', {
//         title: 'CSC315'
//     })
// })
//
// router.get('/books/CSC317', (req, res) => {
//     res.render('education/books/course/CSC317', {
//         title: 'CSC317'
//     })
// })
//
// router.get('/books/MTH301', (req, res) => {
//     res.render('education/books/course/MTH301', {
//         title: 'MTH301'
//     })







module.exports = router;
