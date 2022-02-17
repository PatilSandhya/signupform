const mongoose = require('mongoose');
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
        unique: true
    },
    contact:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    }
})

var User = mongoose.model('USER', userSchema);
//const userinfo = mongoose.model('userinfo'.schema);
module.exports = User;
//module.exports={
 //   user:user,
 //   }
