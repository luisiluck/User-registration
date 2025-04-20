const { Kafka } = require('kafkajs');

class KafkaClient {
  constructor(broker) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    this.messages = [];
  }

  async connect(topics) {
    await this.consumer.connect();
    for (const topic of topics) {
      await this.consumer.subscribe({ topic, fromBeginning: true });
    }
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const parsed = JSON.parse(message.value.toString());
        this.messages.push({ topic, value: parsed });
      }
    });
  }

  async waitForMessage(topic, timeout = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const found = this.messages.find(m => m.topic === topic);
      if (found) return found;
      await new Promise(res => setTimeout(res, 200));
    }
    throw new Error(`Timeout waiting for message on topic ${topic}`);
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}

module.exports = KafkaClient;