const express = require('express')
const app = express()

app.use(express.static('public'))

// root
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

server = app.listen(3000)