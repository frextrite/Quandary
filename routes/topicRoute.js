const express = require('express');
const route = express.Router();

const topicController = require('../controllers/topic-controller');

route.post('/',async (req,res) => {
    try{
        res.status(201).send(await topicController.addTopic(req.body.topic))
    }
    catch(err){
        // console.log(err)
        res.status(400).send({error: "Something went wrong!"})
    }
})
route.delete('/',async (req,res) => {
    try{
        res.send(await topicController.removeTopic(req.body.id))
    }
    catch(err){
        // console.log(err)
        res.status(400).send({error: "Something went wrong!"})
    }
})
route.get('/',async (req,res) => {
    try{
        res.send(await topicController.getAllTopics())
    }
    catch(err){
        // console.log(err)
        res.status(400).send({error: "Something went wrong!"})
    }
})

module.exports = route;