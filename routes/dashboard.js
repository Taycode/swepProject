const express = require('express');
const router = express.Router();

//render dashboard
router.get('/', (req, res) => {
    let cookies = req.cookies.auth
    // console.log(typeof cookies)
    // if(cookies !== null) {
    //     console.log('ori e pe');
    // }
    // console.log(req.cookies)
    console.log(req.session.id)

    if (cookies === null || cookies === undefined) {
        res.redirect('/login')
        // console.log('invalid cookies')
    } else {
        res.render('dashboard', {
            // user: req.user.firstname + req.user.lastname
        });
    }
});

//logout route

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) console.log('Error: failed to destroy the session during logout', err);
        req.user = null
        res.redirect('/login')
    })
});

router.get('/download', (req, res) => {
 const file = `${__dirname}/pdf/cpe301.pdf`;
 res.download(file);
});




module.exports = router;
