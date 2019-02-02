const topicController = require('../controllers/topic-controller');

(async () => {
    const topics = ["naruto","boruto","mha","fma"];
    for (topic of topics){
        let topicData = await topicController.addTopic(topic);
        console.log(`added ${topicData.name}`);
    }
    process.exit();
})();


