const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
let client, db

async function connectDb() {
  client = new MongoClient(uri)
  await client.connect();
  db = client.db(process.env.MONGO_DB_NAME || "userdb");
}

async function userExists(email) {
  const collection = db.collection("users");

  return await collection.findOne({ email })
}

async function updateUser(verificationToken, update) {
  const collection = db.collection("users");

  return await collection.findOneAndUpdate(
    { verificationToken },
    { $set: update },
    { returnDocument: "after" }
  );
}

async function addUser(user) {
  const collection = db.collection("users");

  await collection.insertOne(user)
}

async function disconnectDb() {
  console.log("Disconecting from DB...")
  await client.close()
}

module.exports = { userExists, addUser, updateUser, connectDb, disconnectDb };