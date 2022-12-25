const express = require('express');
const { signup } = require('../controllers/user-control');
const router = express.Router();

router.post('/signup',signup);

router.post('/signin',(req,res)=>{
    // console.log(req.body);
    user.findOne({email: req.body.email})
    .exec((error, user)=>{
        if(user) return res.status(400).json({
            message:"User already exists"
        });
    });
    const {
        firstName,
        lastName,
        email,
        password,
    }= req.body;
    const _user= new user({
        firstName,
        lastName,
        email,
        password,
        userName:Math.random().toString()
    });
    _user.save((error,data)=>{
        if(error){
            return res.status(400).json({
                message:"something went wrong"
            });
        }

        if(data){
            return res.status(201).json({
                message:"user created successfully."
            })
        }
    })

});

module.exports= router;