const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
const messagesRoute = require('./routes/messagesRoute');
const socket = require('socket.io');


const app = express();
dotenv.config({ path: 'config.env' });
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoute);
app.use('/api/messages', messagesRoute);


mongoose.connect(process.env.MONGO_URL, () => console.log('MongoDB connected'))
const server = app.listen(process.env.PORT, () => console.log('server listening at ' + process.env.PORT));

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});