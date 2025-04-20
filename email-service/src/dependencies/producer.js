const { Kafka } = require("kafkajs");

const brokers = process.env.KAFKA_BROKERS?.split(',') || ["localhost:9092"]
const kafka = new Kafka({ clientId: "email-service", brokers: brokers });
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