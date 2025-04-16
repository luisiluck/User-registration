const express = require('express');
const bodyParser = require('body-parser');
const {registerRoute, verifyRoute } = require('./routes');
const { connectKafka, disconnectKafka } = require('./dependencies/kafka');
const { connectDb, disconnectDb } = require('./dependencies/userStore')

const app = express();

app.use(bodyParser.json());
app.use('/', registerRoute);
app.use('/', verifyRoute);

async function startDependencies(){
  console.log("Starting dependencies...")
  await connectDb();
  await connectKafka();
}

async function stopDependencies(){
  console.log("Stopping dependencies...")
  await disconnectDb();
  await disconnectKafka();
}

module.exports = { app, startDependencies, stopDependencies };