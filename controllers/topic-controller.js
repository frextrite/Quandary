const {mongoose} = require('../server/db/mongoose')
const {Topic} = require('../server/models/topic')


const getAllTopics = async () => {
    let topics = await Topic.find()
    topics = topics.map(data => {
        return {
            id: data.id,
            name: data.name
        }
    })
    return topics
}
const addTopic = async (topic) => {
    let createdTopic = await new Topic({name: topic}).save()
    return {
        id: createdTopic.id,
        name: createdTopic.name
    }
}

const removeTopic = async (topicId) => {
    let removedTopic = await Topic.findByIdAndRemove(topicId)
    return {
        id: removedTopic.id,
        name: removedTopic.name
    }
}

module.exports = {
    getAllTopics,
    addTopic,
    removeTopic
}