const { startAuditService } = require("./auditService");

// Start the consumer
startAuditService()
  .then(() => {
    console.log("Kafka consumer started");
  })
  .catch((error) => {
    console.error("Error starting Kafka consumer:", error);
    process.exit(1);
  });