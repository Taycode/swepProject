const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if(err) console.log('Error: failed to destroy the session during logout', err );
        req.user = null
        res.redirect('/login')
    })
});