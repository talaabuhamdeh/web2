/*const mongoose = require('mongoose');
const Joi = require('joi')

mongoose.connect('mongodb://localhost/users')
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.log("Failed connection with DB " + e)
}) //Promis

// mongoose.model vs mongoose schems
const UserVerification = mongoose.model('UserVerification', new mongoose.Schema({
    userId: String,
    uniqueString: String, 
    createdAt: Date,
    expiresAt: Date,
}))


module.exports = UserVerification  */