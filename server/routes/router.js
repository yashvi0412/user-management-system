const express= require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller')



const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req ,file, cb){
//         return cb(null, "./uploads");
//     },
//     filename: function(req,file,cb){
//         return cb(null, `${Date.now()}-${file.originalname}`);

//     },
// });

// const upload = multer({storage:storage});

route.get('/',services.homeRoutes);

route.get('/add-user',services.add_user);
   
route.get('/update-user',services.update_user);
    
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

// module.exports = upload;
module.exports = route;