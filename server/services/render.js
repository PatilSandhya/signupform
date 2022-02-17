const axios = require('axios');

exports.HomeRoute = (req,res)=>{
    res.render('index');
}

exports.add_user = (req,res)=>{
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