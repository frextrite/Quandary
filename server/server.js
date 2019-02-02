const express = require('express')
const randomstring = require('randomstring')
const socketio = require('socket.io');
const http = require('http')

const path = require('path')

const chatController = require('../controllers/chat-controller')

const topicRoute = require('../routes/topicRoute');

const app = express()
const server = http.Server(app)
const io = socketio(server) 

const PORT = process.env.PORT || 3000 ;


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/topics',topicRoute)

io.on("connection",async (socket) => {
    console.log(`socket ${socket.id} connected`)
    let inChat = false;
    const socketInfo = {
        id: socket.handshake.query.id,
        socketid: socket.id
    }
    let bSocketId = await chatController.join(socketInfo)
    let roomName;
    if(bSocketId != null){
        roomName = randomstring.generate()
        socket.emit("FOUND",{
            username: randomstring.generate(),
            roomName: roomName
        });
        socket.to(bSocketId).emit("FOUND",{
            username: randomstring.generate(),
            roomName: roomName
        });
    }
    socket.on("FOUND",data => {
        socket.join(data.roomName)
        socket.leave(socket.id)
        console.log(`${socket.id} joined ${data.roomName}`)
        roomName = data.roomName
        inChat = true
    })
    socket.on("SEND",data => {
        console.log(data)
        console.log(`sent to ${roomName}`)
        io.to(roomName).emit("RECV",data)
    })
    socket.on('disconnect',() => {
        chatController.leave(socketInfo)
    })
})

app.use('/', express.static(path.join(__dirname,'../public')))


server.listen(PORT,console.log(`Server started on port ${PORT}`))

module.exports = {server};