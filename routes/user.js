const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { User } = require("../models");

    router.get("/",(req,res)=>{
        res.send("User route is displaying data");
    })

    router.get('/register',(req,res) => {
        // res.sendFile(path.join(__dirname,'./view/Admin/auth', 'register.html'));
        res.render('register');
    })

    router.post('/register', async (req, res) => {
        // const { first_name: firstName, last_name: lastName, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const userDetails = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
        }
        // const passwordHashed = bcrypt.hash(password, salt)
        // console.log(userDetails);
        try {
        // console.log(firstName, lastName, email, password);
        const newUser = await User.create(userDetails);
        // console.log('User registered:', newUser.email);
        res.redirect('/user/login');
        } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).send('Registration failed.');
        }
    });

    router.get('/login',(req,res) => {
        res.render('login');
    })

    router.post('/login',async (req, res) => {
        const { email, password } = req.body;
        // console.log(email, password);
        const user = await User.findOne({ where : {email : req.body.email }});
        // console.log(user);
        if(user){
            const password_valid = await bcrypt.compare(req.body.password,user.password);
            if(password_valid){
                res.redirect('/user');
            }else{
                res.redirect('/user/login');
            }
        }else{
            res.send('Invalide user');
        }

    })

module.exports=router;