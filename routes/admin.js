const express = require('express');
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const router = express.Router();

const app = express();

router.get('/login',(req, res) => {
    res.render('./Admin/auth/login')
})

router.get('/dashboard', (req, res) => {
    res.render('./Admin/dashboard');
})

module.exports = router;