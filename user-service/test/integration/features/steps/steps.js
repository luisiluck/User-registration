const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber')
const { DockerComposeEnvironment } = require("testcontainers");
const request = require('supertest');
const should = require('should');
const { KafkaClient, MessagesBox, sut } = require('./support')
setDefaultTimeout(120000);

const kafkaClient = new KafkaClient('localhost:9092')
const messages = new MessagesBox()

Given(/a user with email "(.+)" (does not exist|exists) in database/, async function (email, exists) {
    if (exists === 'exists' && !(await sut.userStore.userExists(email))) {
        const user = new sut.User('name', email, 'abc123')
        user.verificationToken = 'testT0k3n'
        await sut.userStore.addUser(user)
    }
});

When('a {string} request is sent to {string} with...', async function (method, path, values) {
    const { query, body } = JSON.parse(values)
    this.response = await request(sut.app)[method.toLowerCase()](path).query(query).send(body)
    console.log(JSON.stringify(this.response))
});

Then('a {int} response should be received with...', function (expectedStatus, expectedBody) {
    const { status, body } = this.response
    status.should.equal(expectedStatus)
    body.should.deepEqual(JSON.parse(expectedBody))
});

Then('a user with email {string} should exist in database with...', async function (email, values) {
    const user = await sut.userStore.userExists(email)
    should.exist(user)
    user.should.containEql(JSON.parse(values))
});

Then('a {string} event should be produced with...', async function (topic, values) {
    const message = await messages.waitForMessage(topic, (msg) => msg)
    message.payload.should.containEql(JSON.parse(values))
});

BeforeAll(async function () {
    await new DockerComposeEnvironment('test/integration/', 'docker-compose.yml').up();
    await sut.startDependencies();
    await messages.startConsumer(kafkaClient.getConsumer(), 'user.registered', 'user.verified', 'verification.requested')
})

AfterAll(async function () {
    await sut.stopDependencies();
    await kafkaClient.getConsumer().disconnect()
})