class MessagesBox {

    messages = []

    async startConsumer(consumer, topic) {
        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({message}) => {
                this.messages.push(JSON.parse(message.value.toString()))
            }
        })
    }

    async waitForMessage(predicate, timeoutMs = 5000, intervalMs = 100) {
        const start = Date.now();

        return new Promise((resolve) => {
            const check = () => {
                const found = this.messages.find(predicate);
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