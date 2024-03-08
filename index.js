import './env.js' 
import swagger from 'swagger-ui-express'
import apidocs from './swagger.json' assert {type:'json'}
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDB } from './src/config/mongodb.config.js';
import userrouter from './src/features/user/user.routes.js';


const PORT = '5200';
const app = express();

// Handling cors
app.use(cors())

// Application level middlewares
// parsing incoming request bodies in JSON format
app.use(bodyParser.json())

// API DOC ROUTE
app.use('/api-docs', swagger.serve, swagger.setup(apidocs))

// Routing api calls to user endpoints 
app.use('/api/user',userrouter)

// Route for the root URL
app.get('/', (req, res) => {
    res.send("Welcome to E-com API")
})

// Middleware to handle all the requests which doesn't exist to handle 404
app.use((req,res)=>{
    res.status(404).send("API not found")
})

app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}`);
    connectToDB()
})