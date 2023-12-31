const express = require('express');
const app  = express();
const path = require('path');   

const connection = require('./config/db')

// for make public as a static location
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views/Admin/auth');

app.get('/register',(req,res) => {
    // res.sendFile(path.join(__dirname,'./view/Admin/auth', 'register.html'));
    res.render('register');
})
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