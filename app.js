const express = require('express');
const app  = express();
const path = require('path');   
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const sequelize = require('./database');
const { User } = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));

// for make public as a static location
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views/Admin/auth');

app.get('/register',(req,res) => {
    // res.sendFile(path.join(__dirname,'./view/Admin/auth', 'register.html'));
    res.render('register');
})

app.post('/register', async (req, res) => {
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
      res.send('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error.message);
      res.status(500).send('Registration failed.');
    }
  });

app.get('/login',(req,res) => {
    res.render('login')
})

app.get('/', (req,res)=>{
    res.send('Welcome');
})

// server run
app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`);
  });