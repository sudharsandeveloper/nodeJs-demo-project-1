const express = require('express');
const app  = express();
const path = require('path');   
const bodyParser = require('body-parser');

const sequelize = require('./database');

// Routes
const userRoute = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoute);

// for make public as a static location
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views/Admin/auth');

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