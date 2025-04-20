const {MongoClient} = require('mongodb')

class DbClient {
    constructor(uri, dbName) {
      this.uri = uri;
      this.dbName = dbName;
      this.client = new MongoClient(this.uri);
    }
  
    async connect() {
      if (!this.client.isConnected?.()) {
        await this.client.connect();
        console.log("Connected to MongoDB");
      }
      this.db = this.client.db(this.dbName);
    }
  
    async findOne(collectionName, filter = {}) {
      if (!this.db) {
        throw new Error("You must connect first using .connect()");
      }
      return this.db.collection(collectionName).findOne(filter);
    }

    async waitForDocument(collectionName, filter, timeoutMs = 5000, intervalMs = 100) {
        const start = Date.now();

        return new Promise(async(resolve) => {
            
            const check = async () => {
                const found = await this.findOne(collectionName, filter);
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
  
    async disconnect() {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    }
  }

module.exports = DbClient