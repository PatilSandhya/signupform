var User = require('../model/model');
require('../database/connection');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
    const email = req.body.email;
         
    User.findOne({email:email})
    .then((userExist) => {
        if(userExist){
            return res.status(422).json({ error: "email already exist"});
        }
        const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        description: req.body.description
        });

        user.save().then(data => {
        //res.send(data)
        res.redirect('/');
        //return res.status(201).json({ error: "user register"});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error in createing user"
        });
    });
    }).catch(err => {console.log(err);});

    

    
}

exports.find = (req, res) =>{
    User.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "error occured"});
    })
}


