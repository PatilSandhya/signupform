const axios = require('axios');
const bcrypt = require('bcryptjs/dist/bcrypt');
var User = require('../model/model');

exports.HomeRoute = (req,res)=>{
    res.render('index');
}

exports.add_user = (req,res)=>{
    console.log(req.body.fname);
    res.render('adduser');
}

exports.all_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
//      console.log(response);
        res.render('alluser', {users:response.data});
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.log_in = async(req, res)=>{
    //console.log(req.body);
    //res.json({message: "correct"});
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({message:"Content can not be empty"});
            return;
        }
         const userLogin = await User.findOne({email: email});
        if(userLogin){
            const passMatch = await bcrypt.compare(password, userLogin.password);
            const name = userLogin.fname
            if(!passMatch){
                res.json({message:"not match pass"});
                console.log("not match pass");

            }
            else{
                console.log("login");
                res.render('login.ejs', {name});

            } 
        }else{
            res.json({message:" invalid"});

        }
        
    }
    catch (err){
        console.log(err);
    }
}