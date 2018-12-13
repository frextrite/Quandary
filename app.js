const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

// root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('New User Connected')
    socket.on('disconnect', (socket) => {
        console.log('User Disconneted')
    })
})

http.listen(3000, () => {
    console.log('Listening on port 3000')
})