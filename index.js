const express = require('express');
const app  = express();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/register',(req,res) => {
    res.sendFile(path.join(__dirname,'./view/Admin/auth', 'register.html'));
})
app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'./view/Admin/auth', 'login.html'));
})


app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`);
  });