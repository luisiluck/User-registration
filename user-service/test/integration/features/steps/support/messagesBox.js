class MessagesBox {

    messages = []

    async startConsumer(consumer, ...topics) {
        await consumer.connect()
        await consumer.subscribe({ topics, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                this.messages.push({ topic, payload: JSON.parse(message.value.toString()) })
            }
        })
    }

    async waitForMessage(topic, predicate, timeoutMs = 5000, intervalMs = 100) {
        const start = Date.now();

        return new Promise((resolve) => {
            const check = () => {
                const found = this.messages.filter(m => m.topic === topic).find(predicate);
                if (found) {
                    return resolve(found);
                }

                if (Date.now() - start >= timeoutMs) {
                    return resolve();
                }

                setTimeout(check, intervalMs);
            };

            check();
        });
    }
}

module.exports = MessagesBox