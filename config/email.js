/*const nodemailer = require('nodemailer')
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
const UserVerification = require('../models/UserVerification')
//require("dotenv").config()

function sendVerEmail({_id, email}){
    //url to be used in the email 
    currentURL = "http://localhost:3200/"
    const uniqueString = uuidv4() + _id;

    //nodemailer staff 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            
        }
    })
    transporter.verify((error, success) =>{
        if(error){
            console.log("Failed to send Email" + error);
        }else{
            console.log("Email sent successfully")
        }
    })

//Step 2
    let mailOption = {
        from: 'Admin', 
        to: email, 
        subject: 'Verify your email', 
        html: `<p>Complete your sign up into your account. </p>
        <p>This link expires in 6 hours.</p> <a href = ${currentURL + "auth/user/verify/"+ _id + "/" + uniqueString}> Click here to complete the process</a>`
    };
    //hash the unique string
    hasheduniqueString = bcrypt.hash(uniqueString, 10)
    .then((hasheduniqueString) => {
        // seet values in 
        const newUserVer = new UserVerification({
            userId: _id, 
            uniqueString: hasheduniqueString, 
            createdAt: Date.now(),
            expiresAt: Date.now() + 2660000000,
        })
        newUserVer.save()
        .then(()=>{
            //step 3 
            transporter.sendMail(mailOption, function(err, data){
                if(err){
                    console.log("Error! " + err)
                }else{
                   console.log("Done !!!!!")
                }
            })
        })//then
    })
    .catch((e)=>{
        console.log("Error while hashing uuid ")
    })
}
module.exports = {sendVerEmail}*/
