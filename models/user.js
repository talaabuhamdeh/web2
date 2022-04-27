const mongoose = require('mongoose');
const Joi = require('joi')

mongoose.connect('mongodb://localhost/users')
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.log("Failed" + e)
}) //Promis

// mongoose.model vs mongoose schems
const User = mongoose.model('User', new mongoose.Schema({
    fullName:{
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 100,
    },
    email:{
        type: String, 
        required: true, 
        unique: true,     
    },
    password:{
        type: String, 
        required: true, 
        minlength: 8,
        maxlength: 1000,//password has a huge maxLength to be able to hash it to prevent hacking
    },
    /*verified:{
        type: Boolean,//password has a huge maxLength to be able to hash it to prevent hacking
    }*/
}))



function userValidate(user){
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    }) 
    //const {error, value} =
    return schema.validate({fullName : user.fullName,email: user.email, password: user.password});
}

module.exports = {User, userValidate};