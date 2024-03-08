import {MongoClient} from 'mongodb'

const url = process.env.DB_URL

let client;
export const connectToDB=()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client = clientInstance
        console.log('MongoDB connection established');
    }).catch(err=>{
        console.log(err);
    })
}

export const getDB =()=>{
    return client.db()
}