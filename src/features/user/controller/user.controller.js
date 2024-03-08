import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import userRepo from "../repository/user.repository.js";

export default class userController{
    
    constructor(){
        this.userRepo = new userRepo
    }

    intro =(req,res)=>{
        try {
            res.status(200).send('Welcome to the user api ATG.')
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }

    async signup(req,res){
        try{
            const {email,password,fav_food} = req.body
            const hashedPassword = await bcrypt.hash(password,12)
            const user = new userModel(email,hashedPassword,fav_food)
            await this.userRepo.signup(user)
            res.status(201).send('user created with id: ' + email)
        }catch(e){
            res.status(500).send('Internal Server Error')
        }
    }


    async signin(req,res){
        try {
            
            const result = await this.userRepo.findUserByEmail(req.body.email)
            if(!result){
                return res.status(400).send('Incorrect Credentials')
            }else{
                const matched = await bcrypt.compare(req.body.password, result.password)
                if(matched){
                    return res.status(200).send('Signed in successfully')
                }else{
                    return res.status(400).send('Incorrect Credentials')
                }
            }
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }

    async forgotPassword(req,res){
        try {
            const result = await this.userRepo.findUser(req.body.email,req.body.fav_food)
            if(!result){
                return res.status(400).send('No such user found')
            }else{
                const new_password = req.body.new_password
                const hashedNewPassword = await bcrypt.hash(new_password,12)
                await this.userRepo.updatePassword(req.body.email,hashedNewPassword)
                res.status(201).send('user password updated with id: ' + req.body.email)
            }
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }
}