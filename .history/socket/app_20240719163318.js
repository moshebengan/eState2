import { Server } from "socket.io";
import dotenv from 'dotenv'

dotenv.config()

const io = new Server({
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true

    }
})

let onlineUsers = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUsers.find(user => user.userId === userId);
    if (!userExists) {
        onlineUsers.push({userId, socketId});
    }
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return onlineUsers.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id)
        
    })

    

    socket.on("sendMessage", ({ receiverId, data}) => {
        const receiver = getUser(receiverId)
        io.to(receiver.socketId).emit("getMessage", data)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
})


const port = process.env.SOCKET_PORT || 4000
io.listen("4000", () => console.log(`socket server is listening on port ${port}`))