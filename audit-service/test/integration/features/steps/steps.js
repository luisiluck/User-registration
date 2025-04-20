const { Given, When, Then, BeforeAll, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { DockerComposeEnvironment } = require("testcontainers");
const should = require('should');
const { KafkaClient, DbClient, MessagesGenerator, sut } = require('./support')

setDefaultTimeout(120000);

const kafkaClient = new KafkaClient('localhost:9092');
const dbClient = new DbClient(process.env.MONGODB_URI || "mongodb://localhost:27017", 'auditdb');

let environment

Given('the Audit service is running', async function () {
    await sut.startAuditService()
});

When('the {string} event is consumed with...', async function (topic, values) {
    const messageGenerator = new MessagesGenerator(kafkaClient.getProducer())
    await messageGenerator.generate(topic, JSON.parse(values))
});

Then('the {string} type should be stored with...', async function (type, payload) {
    const document = await dbClient.waitForDocument('audit_logs', {eventType: type});
    document.payload.should.deepEqual(JSON.parse(payload))

  });

BeforeAll(async function () {
    environment = await new DockerComposeEnvironment('test/integration/', 'docker-compose.yml').up();
    await dbClient.connect()
})

After(async function (){
    await sut.stopAuditService()
    await new Promise(resolve => setTimeout(resolve, 1000));
})

AfterAll(async function () {
    await kafkaClient.getProducer().disconnect()
    await dbClient.disconnect()
    await environment.down()
})