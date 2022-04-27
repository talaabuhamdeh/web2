const express = require('express')
const router = express.Router()
const session = require("express-session")
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))


router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get("/welcome/:message", (req, res)=>{
        res.render("welcome", {message: req.params.message});
 })

module.exports = router