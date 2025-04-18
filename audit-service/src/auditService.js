const { Kafka } = require("kafkajs");
const { createAudit, disconnectDb } = require("./db")

const kafka = new Kafka({ clientId: "audit-service", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "audit-service" });

const startAuditService = async function() {

  await consumer.connect();
  await consumer.subscribe({ topic: "user.registered", fromBeginning: true });
  await consumer.subscribe({ topic: "user.verified", fromBeginning: true });
  await consumer.subscribe({ topic: "verification.requested", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
        createAudit({
            type: topic,
            payload: JSON.parse(message.value.toString()),
            timestamp: new Date()
        });
      console.log(`topic: ${topic}, message: ${message.value.toString()}`)
    },
  });
}

const stopAuditService = async function() {
  await consumer.disconnect();
  await disconnectDb();
}

module.exports = { startAuditService, stopAuditService };