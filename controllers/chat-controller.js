const {mongoose} = require('../server/db/mongoose')
const {Topic} = require('../server/models/topic')

const join = async (data) => {
    let topic = await Topic.findById(data.id)
    let bSocketId = null
    if(topic.waiting.length == 0){
        await Topic.findByIdAndUpdate(
            data.id,
            {$push: {waiting: data.socketid}})
    }
    else{
        bSocketId = await Topic.findByIdAndUpdate(
            data.id,
            {$pop: {waiting: -1}})
        bSocketId = bSocketId.waiting[0]
        console.log(bSocketId)
    }
    return bSocketId
}

const leave = async (data) => {
    let removedSocketId = Topic.findByIdAndUpdate(
        data.id,
        {$pull: {waiting: data.socketid}
    })
    return removedSocketId
}

module.exports = {
    join,
    leave
}