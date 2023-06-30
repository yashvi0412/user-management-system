var Userdb = require('../model/model');

//create user
exports.create = (req,res)=>{
   if(!req.body){
    res.status(400).send({message:'Content can not be empty'});
    return;
   }

   //new user
   const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
    // image:{data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    // contentType: 'image/png'}
   })

   //save user in the  database
   user.save(user).then(data=>{
    // res.send(data)
    res.redirect('/add-user')
   }).catch(err=>{
    res.status(500).send({message:err.message || 'Error occured while creating a user'});
   });
}

//retrive and return all users or single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id= req.query.id;
        Userdb.findById(id)
       .then(data=>{
        if(!data){
            res.status(404).send({message: 'Not found user with id '+id});
        }
        else{
            res.send(data)
        }
       })
       .catch(err=>{
        res.status(500).send({message:err.message || 'Error retieving user with id '+id});
       })

    }else{
    Userdb.find().
    then(user=>{
        res.send(user)
    }).catch(err =>{
        res.status(500).send({message:err.message || 'Error occured while retiving user information'});
    })
    }
}

//update user
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: 'Data to update can not be empty'})
    }
    const id =req.params.id;
    Userdb.findByIdAndUpdate(id, req.body)
       .then(data=>{
        if(!data){
            res.status(404).send({message: 'Can not update user with ${id}. Maybe user not found'})
        }
        else{
            res.send(data)
        }
       })
       .catch(err=>{
        res.status(500).send({message:err.message || 'Error occured while updating user information'});
       })

}

//delete a user
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data=>{
        if(!data){
            res.status(404).send({message: 'Can not delete user with ${id}. Maybe id is wrong'})
        }
        else{
            res.send({message:'User was deleted  successfully!'})
        }
       })
       .catch(err=>{
        res.status(500).send({message:err.message || 'Could not delete user with id=' +id});
       });

}