const mongoose = require('mongoose');
	const Schema = mongoose.Schema;
	const Joi = require('joi');

	const userSchema = new Schema({
	  name: {
		type: String,
		required : true
	  },
	  email : {
		type: String,
		required : true
	 },
	  password : {
	   type: String,
	   required : true
	 }
		});

	const User = mongoose.model("user", userScheme);

	const validate = (user) => {
		const schema = Joi.object({
		name: Joi.string().required(),
		email : Joi.string().email().required(),
		password : Joi.string().required()
			})
			return schema.validate(user)
	}
const {User, validate} = require("../models/user")
const express = require('express');
const router = express.Router();

router.post("/", async(req, res)=> {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.detaiis[O].message)
    }catch(error){
		res.send("An error occured");
		console.log(error);
	}

    const user = await new User(req.body).save();

    res.send(user)
})

module.exports = { User, validate, router }
