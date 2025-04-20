const { setWorldConstructor, BeforeAll, AfterAll, setDefaultTimeout} = require('@cucumber/cucumber');
const dotenv = require('dotenv');
const { DockerComposeEnvironment } = require("testcontainers");
dotenv.config();

const KafkaClient = require('./kafkaClient');
const DbClient = require('./dbClient');
const UserFactory = require('./userfactory');
const ApiClient = require('./apiClient');
const MailBox = require('./mailbox')

setDefaultTimeout(120000);

let kafkaClient;
let dbClient;
let apiClient;
let userFactory;
let mailBox;

class CustomWorld {
  constructor() {
    this.kafkaClient = kafkaClient;
    this.dbClient = dbClient;
    this.apiClient = apiClient;
    this.emailClient = mailBox;
    this.userFactory = userFactory;
    this.context = {}
  }

  async buildUser(){
    return await this.userFactory.build()
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async () => {
  await new DockerComposeEnvironment('../', 'docker-compose.yml').up();
  kafkaClient = new KafkaClient(process.env.KAFKA_BROKER);
  dbClient = new DbClient(process.env.MONGO_URI, 'auditdb');
  apiClient = new ApiClient();
  userFactory = new UserFactory();
  mailBox = new MailBox();

  await kafkaClient.connect(['user.registered']);
  await dbClient.connect();
});

AfterAll(async () => {
  await kafkaClient.disconnect();
  await dbClient.disconnect();
});