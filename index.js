const Joi=require('joi');
const helmet=require('helmet');
const morgan=require('morgan');
const config=require('config');
const debug=require('debug')('app:startup');
const db = require("./models/user");
const express=require('express');
const logger=require('./middleware/logger');
const pages = require('./routes/pages');
const passport = require('passport');
const session = require("express-session");
const app=express();

require('./passport');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pages)
app.use('/auth', require('./conrollers/auth'))

app.set('view engine','hbs');
app.set('views','./views');


app.use(express.json());
app.use(express.urlencoded(({extended:true})));
app.use(express.static('public'));
app.use(helmet());


function isLoggedIn(req, res, next){//This is a middleware function                       
    req.user ? next() : res.sendStatus(401);
}



//configuration
console.log('Application Name:'+ config.get('name'));
console.log('Mail Server:'+ config.get('mail.host'));
console.log('Mail Passwoed:'+ config.get('mail.password'));



if(app.get('env')==='development'){
    app.use(morgan('tiny'));
   debug('morgan enabled...');
}

app.use(logger);



app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] } ))//scope defines what kind of information we want to retreive from the user profile

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: 'auth/google/failure',
}))

app.get('auth/google/failure', (req, res)=>{
    res.send("Sorry! But somehing went wrong.")
})

app.get('/protected', isLoggedIn,(req, res) => {//this is a route which we donnot want people to visit unless they are logged in 
    console.log(`${req.user}`, 'Email = ', `${req.user.email}`)
    res.redirect(`welcome/${req.user.displayName}`)//when putting a text in `` we put it in a template which means that `` is for templating 
});


app.get('/logout', (req, res)=>{
    req.logOut();
    req.session.destroy(); //This is gonna destroy the current session
    res.render('login')
})



//start the server
app.listen(3200, console.log("localhost:3200"))
