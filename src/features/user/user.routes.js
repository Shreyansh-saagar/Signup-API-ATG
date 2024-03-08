import express from 'express';
import userController from './controller/user.controller.js';


const userrouter = express.Router();
const uc = new userController()


userrouter.get('/',(req,res)=>{
    uc.intro(req,res)
})

userrouter.post('/signup',(req,res)=>{
    uc.signup(req,res)
})

userrouter.post('/signin',(req,res)=>{
    uc.signin(req,res)
})

userrouter.post('/forgotpassword',(req,res)=>{
    uc.forgotPassword(req,res)
})

export default userrouter;