const KafkaClient = require("./kafkaClient");
const MessagesGenerator = require("./messagesGenerator");
const DbClient = require("./dbClient")
const sut = require("../../../../../src/auditService")

module.exports = {KafkaClient, MessagesGenerator, DbClient, sut}