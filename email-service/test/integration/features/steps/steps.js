const { Given, When, Then, BeforeAll, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { DockerComposeEnvironment } = require("testcontainers");
const should = require('should');
const { KafkaClient, MessagesBox, MessagesGenerator, MailBox, sut } = require('./support')

setDefaultTimeout(120000);

const kafkaClient = new KafkaClient('localhost:9092');
const messages = new MessagesBox();
const mailbox = new MailBox();

Given('the Email service is running', async function () {
    await sut.startEmailService()
});

When('the {string} event is consumed with...', async function (topic, values) {
    const messageGenerator = new MessagesGenerator(kafkaClient.getProducer())
    await messageGenerator.generate(topic, JSON.parse(values))
});

Then(/the verification email to "(.+)" should (be|not be) sent/, async function (email, be) {
    const message = await mailbox.waitForEmail(m => m.To.find(o=>o.Address===email))
    be==='be'? should.exist(message) : should.not.exist(message)
});

Then(/a "(.+)" event should (be|not be) produced with\.\.\./, async function (topic, be, values) {
    const message = await messages.waitForMessage(topic, (msg) => msg)
    be==='be'? message.payload.should.containEql(JSON.parse(values)) : should.not.exist(message)
});



BeforeAll(async function () {
    await new DockerComposeEnvironment('test/integration/', 'docker-compose.yml').up();
    await messages.startConsumer(kafkaClient.getConsumer(), 'user.registered', 'user.verified', 'verification.requested')
})

After(async function (){
    await sut.stopEmailService();
    messages.clearBox();
    await mailbox.deleteMessages();
})

AfterAll(async function () {
    await kafkaClient.getConsumer().disconnect()
})