const startConsumer = require("./kafka/consumer");

// Start the consumer
startConsumer()
  .then(() => {
    console.log("Kafka consumer started");
  })
  .catch((error) => {
    console.error("Error starting Kafka consumer:", error);
    process.exit(1);
  });