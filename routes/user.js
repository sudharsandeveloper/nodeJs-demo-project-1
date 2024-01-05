const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { User } = require("../models");

    router.get("/",(req,res)=>{
      if (req.session.userId) {
        res.send('this is dashboard');
      } else {
        res.redirect('/user/login');
      }
    });

    router.get('/register',(req,res) => {
        // res.sendFile(path.join(__dirname,'./view/Admin/auth', 'register.html'));
        res.render('./User/auth/register');
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
        res.render('./User/auth/login');
    })

    router.post('/login',async (req, res) => {
        const { email, password } = req.body;
        // console.log(email, password);
        try {
          // Find the user in the database using the email field
          const user = await User.findOne({ where: { email } });
          // console.log(user);
        
          if (user) {
            // Compare the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
        
            if (passwordMatch) {
              req.session.userId = user.id;
              console.log(req.session.userId);
              return res.redirect('/user');
            }
          }
        
          res.redirect('/user/login');
        } catch (error) {
          console.error('Error during login:', error.message);
          res.status(500).send('Login failed.');
        }

    })

    // Logout route
    router.get('/logout', (req, res) => {
      // Destroy the session
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Error during logout');
        }
        // Redirect to the login page or any other appropriate page
        res.redirect('/user/login');
      });
    });

module.exports=router;