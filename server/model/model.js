const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    fname:{
        type: 'string',
        required: true
    },
    lname:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid");
            }
        }
    },
    contact:{
        type: Number,
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    }
})




userSchema.pre('save', async function (next){
    console.log("pre ggggg");
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


var User = mongoose.model('USER', userSchema);
//const userinfo = mongoose.model('userinfo'.schema);
module.exports = User;

