const { Kafka } = require("kafkajs");
const sendVerificationEmail = require("../email");
const publishVerificationRequested = require("./producer");

const kafka = new Kafka({ clientId: "email-service", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "email-service" });

const startConsumer = async function() {

  await consumer.connect();
  await consumer.subscribe({ topic: "user.registered", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const user = JSON.parse(message.value?.toString() || "{}");
      
      if (!user.verified) {
        // 1. Send email
        await sendVerificationEmail(user);

        // 2. Notify downstream that email was sent
        await publishVerificationRequested({
            email: user.email,
            source: "email-service",
        });
      }
    },
  });
}

module.exports = startConsumer;