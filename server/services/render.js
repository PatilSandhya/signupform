const axios = require('axios');
const bcrypt = require('bcryptjs/dist/bcrypt');
const nodemailer = require("nodemailer");
var User = require('../model/model');

const transporter = nodemailer.createTransport({
    host: 'mail.technomads.in',
    port: 465,
    secure: true,
    //service : 'gmail',
    auth: {
      user: 'srushti@technomads.in',
      pass: 'Srushti@123', 
    }
    
  }); 


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
            const useremail = userLogin.email
            if(!passMatch){
                res.json({message:"wrong password"});
                console.log("wrong password");

            }
            else{
                const random_otp = Math.floor(Math.random()*100000+900000);

                const mailoption = {
                    from: 'send otp" <test@gmail.com>"', 
                    to: useremail, 
                    subject: "send otp using random", 
                   // text: "Hello world?", 
                    html: `<h1>OTP is '${random_otp} '</h1>`, 
                  }
            
                  transporter.sendMail(mailoption, function(error, info){
                      if(error){
                          console.log(error);
                      }else{
                          console.log("mail send");
                      }
                  })
                console.log(random_otp);

                console.log(useremail);
                res.render('verify_otp.ejs', {name, random_otp} );

            } 
        }else{
            res.json({message:"Email is not registered!"});
        }
        
    }
    catch (err){
        console.log(err);
    }
}



exports.verify_otp = (req,res)=>{
    const {name, random_otp, otp} = req.body;
    
    if(otp === random_otp){
        res.render('login.ejs', {name} );

    }else{
        res.json({message:"wrong OTP"});

        console.log("wrong otp");
    }



   // console.log(random_otp);
    console.log(otp);
    

}