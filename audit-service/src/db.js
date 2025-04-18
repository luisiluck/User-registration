const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

const connect =  async function() {
  if (!client.isConnected?.()) {
    await client.connect();
  }
  return client.db(process.env.MONGO_DB_NAME || "auditdb");
}

const createAudit = async function(event) {
    const db = await connect();
    const collection = db.collection("audit_logs");
  
    await collection.insertOne({
      eventType: event.type,
      payload: event.payload,
      source: event.source || "unknown",
      timestamp: event.timestamp,
    });
  }

  async function disconnectDb() {
    console.log("Disconecting from DB...")
    await client.close()
  }

  module.exports = { createAudit, disconnectDb } 