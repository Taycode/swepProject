const express = require('express');
const router = express.Router();

router.get('/' ,(req, res) => {
    let cookies = req.cookies.auth
    // console.log(typeof cookies)
    if(cookies == null || cookies == undefined) {
        res.render('login', {
            message: 'You are not authorised, login'
        })
    } else {
        res.render('education/books', {
            title: 'Education'
        });
    }

});

router.get('/past_question', (req, res) => {
    res.render('education/pq');
    // res.send('shey o need pq ni');
});

router.get('/books', (req, res) => {
    res.render('education/books')
    // res.send('iwe ogba !!!');
})

router.get('/tutorial_videos', (req, res) => {
    res.render('education/videos');
    // res.send('shey wa wo porn');
});

router.get('/gp_calculator', (req, res) => {
    res.render('education/gp_calculator');
});

router.get('/forum', (req, res) => {
    res.render('education/forum')
})


router.get('/books/CPE311', (req, res) => {
    res.render('education/books/course/CPE311', {
        title: 'CPE311'
    })
})

router.get('/books/CPE301', (req, res) => {
    res.render('education/books/course/CPE301', {
        title: 'CPE301'
    })
})

router.get('/books/CSC305', (req, res) => {
    res.render('education/books/course/CSC305', {
        title: 'CSC305'
    })
})

router.get('/books/CSC307', (req, res) => {
    res.render('education/books/course/CSC307', {
        title: 'CSC307'
    })
})

router.get('/books/CSC315', (req, res) => {
    res.render('education/books/course/CSC315', {
        title: 'CSC315'
    })
})

router.get('/books/CSC317', (req, res) => {
    res.render('education/books/course/CSC317', {
        title: 'CSC317'
    })
})

router.get('/books/MTH301', (req, res) => {
    res.render('education/books/course/MTH301', {
        title: 'MTH301'
    })
})







module.exports = router;
