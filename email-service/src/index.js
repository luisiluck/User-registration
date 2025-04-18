const { startEmailService } = require("./emailService");

console.log('-----Email Service-----')
// Start Email Service
startEmailService()
  .then(() => {
    console.log("Kafka consumer started");
  })
  .catch((error) => {
    console.error("Error starting Kafka consumer:", error);
    process.exit(1);
  });