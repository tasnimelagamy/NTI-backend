import express from 'express';
import dotenv from 'dotenv'
import database from './config/database';
import mountRoutes from './routes';
import { Server } from 'http';





const app: express.Application = express()
let server: Server;
dotenv.config();
app.use(express.json())
 
database();

mountRoutes(app);

server= app.listen(process.env.PORT,() => { 
    console.log(`app is working on ${process.env.PORT}`);
 })


process.on('unhandledrejection',(err:Error) => { 
    console.error(`unhandledrejection ${err.name} |${err.message}`);
    server.close(() => { 
       console.error('shutting the application') ;
       process.exit(1);
     }) 

 });