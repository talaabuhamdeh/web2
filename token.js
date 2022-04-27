const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users')
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.log("Failed" + e)
}) //Promis
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	  userld: {
		type: String,
		required : true,
	},
	  token : {
		type: String,
		required : true
	},

	  createdAt : {
		type: Date,
		default: Date.now(),
		expires : 360000000
	}
});

module.expires = mongoose.model("token", tokenSchema)
