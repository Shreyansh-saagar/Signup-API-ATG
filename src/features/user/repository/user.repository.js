import { getDB } from "../../../config/mongodb.config.js";

class userRepo{
    async signup(newUser){
        try {
            const database = getDB()
            const userCollection = database.collection('users')
            await userCollection.insertOne(newUser)
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }

    async findUserByEmail(email){
        try {
            const database = getDB()
            const userCollection = database.collection('users')
            return await userCollection.findOne({email})
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(email,fav_food){
        try {
            const database = getDB()
            const userCollection = database.collection('users')
            return await userCollection.findOne({email: email,fav_food: fav_food})            
        } catch (error) {
            console.log(error);
        }
    }

    async updatePassword(email,password){
        try {
            const database = getDB()
            const userCollection = database.collection('users')
            return await userCollection.updateOne(
                { email:email},
                { $set: { 'password': password } }
            );
        } catch (error) {
            console.log(error);
        }
    }
}

export default userRepo;