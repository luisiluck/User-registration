const { Kafka } = require("kafkajs");
const sendVerificationEmail = require("./dependencies/email");
const publishVerificationRequested = require("./dependencies/producer");

const brokers = process.env.KAFKA_BROKERS?.split(',') || ["localhost:9092"]
const kafka = new Kafka({ clientId: "email-service", brokers: brokers });
const consumer = kafka.consumer({ groupId: "email-service" });

async function startEmailService() {

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

async function stopEmailService(){
  await consumer.disconnect()
}

module.exports = {startEmailService, stopEmailService};