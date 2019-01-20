const express = require('express')
const socketio = require('socket.io');
const http = require('http')

const path = require('path')

const chatController = require('../controllers/chat-controller')
const topicController = require('../controllers/topic-controller')

const app = express()
const server = http.Server(app)
const io = socketio(server) 

// const config = require('../config')
const PORT = process.env.PORT || 3000 ;

app.use(express.urlencoded({extended: true}))

app.post('/topics',async (req,res) => {
    try{
        res.status(201).send(await topicController.addTopic(req.body.topic))
    }
    catch{
        res.status(400).send({error: "Something went wrong!"})
    }
})
app.delete('/topics',async (req,res) => {
    try{
        res.send(await topicController.removeTopic(req.body.id))
    }
    catch{
        res.status(400).send({error: "Something went wrong!"})
    }
})
app.get('/topics',async (req,res) => {
    try{
        res.send(await topicController.getAllTopics())
    }
    catch{
        res.status(400).send({error: "Something went wrong!"})
    }
})


io.on("connection",socket => {
    socket.on('JOIN',data => {

    })
})

app.use('/', express.static(path.join(__dirname,'../public')))

// app.use((req,res) => res.redirect('/'))

app.listen(PORT,console.log(`Server started on port ${PORT}`))