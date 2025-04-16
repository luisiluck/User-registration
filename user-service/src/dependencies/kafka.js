const { Kafka } = require('kafkajs');

let producer;

async function connectKafka() {
  const kafka = new Kafka({
    clientId: 'user-registration-service',
    brokers: ['localhost:9092'] 
  });
  producer = kafka.producer();
  await producer.connect();
}

async function publishUserRegistered(user) {
  await producer.send({
    topic: 'user.registered',
    messages: [
      {
        key: user.email,
        value: JSON.stringify(user),
      },
    ],
  });
}

async function publishUserVerified(user) {
    await producer.send({
      topic: 'user.verified',
      messages: [
        {
          key: user.email,
          value: JSON.stringify(user),
        },
      ],
    });
  }

 async function disconnectKafka(){
  console.log("Disconnecting producer...")
  await producer.disconnect()
 } 

module.exports = { connectKafka, publishUserRegistered, publishUserVerified, disconnectKafka };