const { MailpitClient } = require('mailpit-api')

class MailBox {

    constructor(){
        this.client = new MailpitClient(process.env.mailClientHost || "http://localhost:8025");
    }

    async waitForEmail(predicate, timeoutMs = 5000, intervalMs = 100) {
        const start = Date.now();

        return new Promise(async(resolve) => {
            
            const check = async () => {
                const inbox = await this.client.listMessages();
                const found = inbox.messages.find(predicate);
                if (found) {
                    return resolve(found);
                }

                if (Date.now() - start >= timeoutMs) {
                    return resolve();
                }

                setTimeout(check, intervalMs);
            };

            await check();
        });
    }

    async deleteMessages(){
        await this.client.deleteMessages();
    }
}

module.exports = MailBox