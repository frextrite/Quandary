const should = require('chai').should();
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {server} = require('../server');
const {mongoose} = require('../db/mongoose');
const {Topic} = require('../models/topic');


// describe('db connection',() => {
//     it('should connect to the db',done => {
//         const db = mongoose.connection;
//         db.once('open',() => done());
//     })
// })

const newTopics = [{
    _id: new ObjectID,
    name: "tp1" 
},{
    _id: new ObjectID,
    name: "tp2" 
}]

let originalTopics = [];

before(async () => {
    originalTopics = await Topic.find({});
    return await Topic.deleteMany({})
})

beforeEach(async () => {
    await Topic.deleteMany({})
    return await Topic.insertMany(newTopics);
})

after(async () => {
    await Topic.deleteMany({});
    return await Topic.insertMany(originalTopics);
})

describe('POST /topics',() => {
    it('should create a new topic',done => {
        let newTopic;
        request(server)
        .post('/topics')
        .send({topic: "hehe"})
        .expect(201).expect(res => {
            const body = res.body;
            body.should.be.an('object');
            body.name.should.equal("hehe")
            newTopic = res.body;
        })
        .end(async err => {
            if(err) return done(err);
            const topicData = await Topic.findOne({name: "hehe"});
            topicData.id.should.equal(newTopic.id);
            done();
        })
    })
    it('should not create a topic with invalid body data',done => {
        request(server)
        .post('/topics')
        .send({})
        .expect(400)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
})

describe('DELETE /topics',done => {
    it('should delete a topic',done => {
        request(server).delete('/topics').send({id: newTopics[0]._id.toHexString()})
        .expect(200).expect(res => {
            const body = res.body;
            body.should.be.an('object');
            body.id.should.equal(newTopics[0]._id.toHexString());
        })
        .end(async err => {
            if(err) return done(err);
            const topicData = await Topic.findOne({id: newTopics[0]._id.toHexString()});
            should.not.exist(topicData);
            done();
        })
    })
    it('should not delete a non existent topic',done => {
        request(server)
        .delete('/topics')
        .send({})
        .expect(400)
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
});

describe('GET /topics',done => {
    it('should get all topics',done => {
        request(server).get('/topics')
        .expect(200).expect(res => {
            const body = res.body;
            body.should.be.an('array');
            body.should.have.lengthOf(2);
        })
        .end(err => {
            if(err) return done(err);
            done();
        })
    })
});