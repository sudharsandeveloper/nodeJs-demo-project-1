const express = require('express');
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const router = express.Router();
const { User } = require('../models');

const app = express();

router.get('/login',(req, res) => {
    if(req.session.userId){
        return res.redirect('/admin/dashboard');
    }
    res.render('./Admin/auth/login', { formData: {} })
})

router.post('/login',async (req,res) => {

    const { email, password } = req.body;
    const formData = req.body;

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
        req.flash('error', 'Invalid Email/Password');
        res.render('Admin/auth/login', { formData });
    }
    catch(error){
        console.error('Error during login: ', error.message);
        res.status(500).render('Admin/auth/login', { formData });
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
       
        res.redirect('/admin/login');
    });
})

router.get('/staff-create', (req,res) => {
    res.render('./Admin/staff-management/createStaff');
})

router.post('/staff-create',async (req,res) => {
    const { first_name, last_name, email, password } = req.body;
    // console.log(first_name, last_name, email, password);
    const salt = await bcrypt.genSalt(10);
    const userDetails = {
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: await bcrypt.hash(req.body.password, salt)
    }
    console.log(userDetails);
    try {
        // console.log(firstName, lastName, email, password);
        const newUser = await User.create(userDetails);
        // console.log('User registered:', newUser.email);
        req.flash('success', 'User has been created successfully');
        res.redirect('./user/list');
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).send('User creation failed.');
    }
})

router.get('/user/list', (req,res) => {
    res.send('asdfa');
})

module.exports = router;