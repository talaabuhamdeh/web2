const {User} = require('../ models/user'); 
const Token = require('../ models/ token'); 
const sendEmail = require('../utils/sendEmail'); 
const Joi = require('joi'); 
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.post("/resetPassword", async(req, res) => {
	try {
		const schema = Joi.object({ email:Joi.string().email().required() });
		const {error} = schema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send("user with given does not exist"); 

			let token = await Token.findOne({ userld:user._id });
		if (!token) {
			token = await new Token({
			userld: user._id,
			token : crypto.randomBytes(32).toString('hex'),
			}).save()
		}
		const link = `http://localhost:3200/password-reset/ ${ user._id } / ${ token.token }`
		await sendEmail(user.email, "password reset", link);
		res.send("password reset link sent to your email account.")
	}catch (error) {
	res.send("An error occured");
	console.log(error)
}
});
		router.post("/:userld/:token", async(req, res) => {
			try {
				const schema = Joi.object({ password: Joi.string().required() });
				const {error} = schema.validate(req.body);
				if (error) return res.status(400).send(error.details[0].message);

				const user = await User.findByld(req.params.userld);
				if (!user) return res.status(400).send('invalid link or expired.');

				const token = await Token.findOne({
				userid: user._id,
				token : req.params.token
			});
				if (!token) return res.status(400).send("invalid link or expired.");

				user.password = req.body.password
				await user.save();
				await token.delete();

				res.send("password reset successfully")
			}catch (error) {
				res.send('An error occured')
				console.log(error);
			}
		})
	module.exports = router;
