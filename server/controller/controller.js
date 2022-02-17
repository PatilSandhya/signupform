var User = require('../model/model');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        contact: req.body.contact,
        description: req.body.description
    })

    user
    .save(user)
    .then(data => {
        //res.send(data)
        res.redirect('/');
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error in createing user"
        });
    })
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