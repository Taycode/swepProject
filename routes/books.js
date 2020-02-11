const express = require('express');
const router = express.Router();


router.get('/books/CPE311', (req, res) => {
    res.send('book worm');
})

module.exports = router;