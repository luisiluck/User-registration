const { Kafka } = require("kafkajs");
const auditEvent = require("./db")

const kafka = new Kafka({ clientId: "audit-service", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "audit-service" });

const startConsumer = async function() {

  await consumer.connect();
  await consumer.subscribe({ topic: "user.registered", fromBeginning: true });
  await consumer.subscribe({ topic: "user.verified", fromBeginning: true });
  await consumer.subscribe({ topic: "verification.requested", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
        auditEvent({
            type: topic,
            payload: message.value.toString(),
            timestamp: new Date()
        });
      console.log(`topic: ${topic}, message: ${message.value.toString()}`)
    },
  });
}

module.exports = startConsumer;