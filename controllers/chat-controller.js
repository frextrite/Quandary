const {mongoose} = require('../server/db/mongoose')
const {Topic} = require('../server/models/topic')

const join = async (data) => {
    let topic = await Topic.findById(data.id)
    const commonSocketId = null
    if(topic.waiting.length == 0){
        await Topic.findByIdAndUpdate(
            data.id,
            {$push: {waiting: data.socketid}})
    }
    else{
        commonSocketId = Topic.findByIdAndUpdate(
            data.id,
            {$pop: {waiting: -1}})
        console.log(commonSocketId)
    }
    return commonSocketId
}

const leave = async (data) => {
    let removedSocketId = Topic.findByIdAndUpdate(
        data.topicId,
        {$pull: {waiting: data.socketid}
    })
    return removedSocketId
}

module.exports = {
    join,
    leave
}