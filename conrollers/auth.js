const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const db = require("../models/user")
const UserV = require("../models/UserVerification")
const mongoose = require("mongoose")
const emailSender = require("../config/email")
const { render } = require('pug')

const router = express.Router()
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//router.use(cookiesParser());


router.post("/register", (req, res, next)=>{
    const { name, email, password, passwordConfirm} = req.body;//destructuring
    const user = new db.User({
        fullName: name,
        email: email, 
        password: password, 
       // verified: false
    })
    const {error, value} = db.userValidate(user)
    if(error){
        return res.render("register", {message: error.message})    
    }

    let hashedPassword
    db.User.find({email: user.email})
    .then(async (result)=>{
        if(result.length > 0){
            return res.render("register", {message: "Tha email is already in use"})
        }//if
        else if(password !== passwordConfirm){
            return res.render("register", {
                message: "Please write your correct password when confirming it"
            })
        }//else if 
        hashedPassword = await bcrypt.hash(password, 8).then(
            console.log("hashed")
        ).catch((error)=>{
            console.log(error + "Password didnot hashed")
        })     
        user.password = hashedPassword
        user.save()
        /*.then((result) =>{
            //handle account verification 
            emailSender.sendVerEmail({_id: result._id, email: result.email})
        })*/
        .catch((error)=>{
            console.log("Error while saving the user")
            return res.render("register", {
                message: "Cannot register please try again later"
            })
        })
        /*return res.render("register", {
            sucMessage: "User Registered Succefully, "//please check your email to verify it"
            
        })*/
        // انا عملتها 
        return res.render("login"),{
            sucMessage:"Please login"
        }
        //
        //render
    })//then       
})//post 



/*router.get("/user/verify/:userId/:uniqueString", (req, res)=>{
    let {userId, uniqueString} = req.params;
    UserV.find({userId})
    .then((result) => {
        if(result.length > 0){
            //user ver record existsso we proceed
            const {expiresAt} = result[0];
            const hashedUni = result[0].uniqueString;
            if(expiresAt < Date.now()){
                //record has expired so we delete it 
                UserV.deleteOne({userId})
                .then(result =>{
                    db.User.deleteOne({_id: userId})
                    then(()=>{
                        res.render("register", {message: "Please try to sign up again because the link expired"})    
                    })
                    .catch((e)=>{
                        console.log("Error while deleting the record")
                    })
                })
            }else{
                //Valid verification record 
                bcrypt.compare(uniqueString, hashedUni)
                .then(result => {
                    if(result){
                        //string is valid and this is the verification 
                        db.User.updateOne({_id: userId}, {verified: true})
                        .then(()=>{
                            console.log("Updated succede")
                            UserV.deleteOne({userId})
                            .then(()=>{
                                res.render('login')
                            })
                            .catch((e)=>{
                                console.log("Didnot update the ver record" + e)
                                res.render("register", {message: "Check your inbox again please"}) 
                            })
                        })
                        .catch((e)=>{
                        console.log("Didnot update the ver record" + e)
                        res.render("register", {message: "Check your inbox again please"})    
                    }) 
                    }else{
                        //Strings are not the same 
                        res.render("register", {message: "Check your inbox again please"})    
                    }
                })
                .catch((e) => {
                    console.log("Error while comparing the hashed unique string")
                    res.render("register", {message: "Please try to sign up again hashed string"})    
                })
            }
        }else{
        res.render("register", {message: "Please try to sign up again"})    
        }
    })
    .catch((e)=>{
        console.log("Error while verification in its router "+ e)
        res.render("register", {message: "Please try to sign up again"})
    })
 

})*/

router.post("/login", (req, res)=>{
     let {email, password} = req.body;
    db.User.find({email: email})
    .then(async result => { 
        console.log(result[0].email)  
       /* if(result[0].verified){*/
            if(/*await bcrypt.compare*/(password, result[0].password)){
                res.redirect(`/welcome/${result[0].fullName}`)
            }else{
                res.render("login", {failMessage:"Please make sure from your email or password"})   
            }//if for password comparison
       /* }else{//if for user verification     
            res.render("login", {failMessage:"Please check your email inbox to verify your account so you can log in successfully"})   
        } */
    })
    .catch((e) => {
        console.log("Error while retrieving the user" + e)
        res.render("login", {failMessage:"Please try to lo log in again"})
    })
})
module.exports = router
