import express from 'express'
import dbConnection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
dotenv.config();

const app = express();
app.use('/payment/post/update', express.raw({ type: 'application/json' }));
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use('/',Router);





const PORT = 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  
io.on('connection', (socket) => {
    socket.on('send', (msg) => {
      io.emit('receive', msg);
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
dbConnection(USERNAME, PASSWORD);