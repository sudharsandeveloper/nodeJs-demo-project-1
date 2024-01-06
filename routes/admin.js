const express = require('express');
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const router = express.Router();
const { User } = require('../models');

const app = express();

router.get('/login',(req, res) => {
    res.render('./Admin/auth/login')
})

router.post('/login',async (req,res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    try{
        const user = await User.findOne({ where: { email } })
        // console.log(user);
        if(user){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                req.session.userId = user.id;
                return res.redirect('/admin/dashboard')
            }
        }
        res.redirect('/admin/login');
    }
    catch(error){
        console.error('Error during login: ', error.message)
        res.status(500).send('Login failed');
    }
})

router.get('/dashboard', (req, res) => {
    if(req.session.userId){
        res.render('./admin/dashboard');
    }else{
        res.redirect('/admin/login');
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Error during logout');
        }
        // Redirect to the login page or any other appropriate page
        res.redirect('/admin/login');
    });
})

module.exports = router;