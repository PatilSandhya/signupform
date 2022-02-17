const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/',services.HomeRoute);

route.get('/add-user',services.add_user);
route.get('/all-user',services.all_user);


route.post('/api/users',controller.create);
route.get('/api/users',controller.find);


module.exports = route;
