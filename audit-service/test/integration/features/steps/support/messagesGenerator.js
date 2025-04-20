class MessagesGenerator{
    constructor(producer){
        this.producer = producer
    }

    async generate(topic, message){
        await this.producer.connect();

        await this.producer.send({
          topic,
          messages: [{ value: JSON.stringify(message)  }],
        });
      
        await this.producer.disconnect();
    }
}

module.exports = MessagesGenerator