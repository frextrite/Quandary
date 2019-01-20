const mongoose = require('mongoose')

const Topic = mongoose.model('Topic',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    waiting: {
        type: Array,
        default: []
    }
})

module.exports = {Topic}