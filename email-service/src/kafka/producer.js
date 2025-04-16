const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "email-service", brokers: ["localhost:9092"] });
const producer = kafka.producer();

const publishVerificationRequested = async function(data) {
  await producer.connect();

  await producer.send({
    topic: "verification.requested",
    messages: [{ value: JSON.stringify(data)  }],
  });

  await producer.disconnect();
}

module.exports = publishVerificationRequested;