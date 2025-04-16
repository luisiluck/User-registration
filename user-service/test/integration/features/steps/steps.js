const { When, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber')
const { DockerComposeEnvironment } = require("testcontainers");
const request = require('supertest');
const should = require('should');
const {KafkaClient, MessagesBox, sut} = require('./support')
setDefaultTimeout(120000);

const kafkaClient = new KafkaClient('localhost:9092')
const messages = new MessagesBox()

When("say hello", async () => {
    const response = await request(sut.app)
        .post('/register')
        .send({
            name: 'name',
            email: 'test@example.com',
            password: 'securepassword123',
        });
    const message = await messages.waitForMessage((msg) => msg.email === 'test@example.com')
    response.status.should.equal(201)
    should.exist(message)
})

BeforeAll(async function () {
    await new DockerComposeEnvironment('test/integration/', 'docker-compose.yml').up();
    await sut.startDependencies();
    await messages.startConsumer(kafkaClient.getConsumer(), 'user.registered')
})

AfterAll(async function () {
    await sut.stopDependencies();
    await kafkaClient.getConsumer().disconnect()
})