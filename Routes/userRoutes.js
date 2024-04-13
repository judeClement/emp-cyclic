const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../Model/userModel');

router.use(express.json())

// function verifytoken(req,res,next) {
//     try {
//       const token=req.headers.token;
//       if(!token) throw 'unauthorized access'
//       let payload=jwt.verify(token,'secretkey')
//       if(!payload) throw 'unauthorized access'
//       next()
//     } catch (error) {
//       res.status(404).send('caught in error')
//     }
//     }


//to create signup route
router.post('/new',async(req,res)=>{
    try {
        const data=req.body;
        let newUser=await users(data).save()
        console.log(newUser);
        res.status(200).send({message:"data added"})

    } catch (error) {
        console.log(error)
    }
})

// route for login
router.post('/login',async(req,res)=>{
    // let name=req.body.name;
    // let password=req.body.password;
    const { name, password } = req.body;

    const user = await users.findOne({ name: name });
    if(!user){
        res.json({message:'user not found'})
    }
    try {
        if(user.password===password){
            let payload={user:name,pwd:password}
            let token=jwt.sign(payload,'secretkey');
        // res.json({message:"login success",user})
        // res.send({message:'login success'})
        res.send({message:'login success',token:token})

        }else{
            res.json({message:"login failed"})
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
