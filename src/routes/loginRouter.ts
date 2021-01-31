const express = require("express");
const bodyParser = require('body-parser');
const {s3Bucket, saveArraytoS3} = require("../lib/aws")
const Users = require("../models/users");
export const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/create')
.post((req:any,res:any, next:any)=>{
    req.body.createdAt = Date.now();
    Users.create(req.body)
    .then((user:any)=>{
        res.statusCode = 200;
        res.json(user);
    })
    .catch((err:any)=>next(err));
});

loginRouter.route('/login')
.post((req:any,res:any, next:any)=>{
    const userData = req.body;
    const username = userData.username;
    const password = userData.password;
    Users.findOne({username : username, password : password})
    .then((user:any)=>{
        res.statusCode = 200;
        if(!user){
            user = {"error" : "User not found"};
        }
        else if(!user.isActive){
            res.json({"error" : "User is inactive"});
        }
        res.json(user);
    })
    .catch((err:any)=>next(err));
});

loginRouter.route('/upload')
.put((req:any,res:any, next:any)=>{
    const userData = req.body;
    const timeStamp = userData.timeStamp;
    Users.find({createdAt : {$gt : timeStamp}}, {username : 1, isActive:1, _id:0})
    .then((users:any)=>{
        res.statusCode = 200;
        if(!users){
            users = {"error" : "No User not found"};
        }
        saveArraytoS3(users, `${timeStamp}.csv`,s3Bucket)
        res.json(users);
    })
    .catch((err:any)=>next(err));
});

