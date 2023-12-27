const express = require('express');
const app  = express();
const path = require('path');

// for make public as a static location
app.use(express.static(path.join(__dirname, 'public')));

app.get('/register',(req,res) => {
    res.sendFile(path.join(__dirname,'./view/Admin/auth', 'register.html'));
})
app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'./view/Admin/auth', 'login.html'));
})

// server run
app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`);
  });