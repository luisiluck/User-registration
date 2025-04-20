const { Kafka } = require('kafkajs')

class KafkaClient{

    constructor(...brokers){
        this.kafka = new Kafka({
            brokers: brokers,
          });
    }

    getConsumer(){
        if(!this.consumer){
            this.consumer = this.kafka.consumer({ groupId: 'test-group' });
        }
        return this.consumer
    }

    getProducer(){
        if(!this.producer){
            this.producer = this.kafka.producer();
        }
        return this.producer;
    }
}
module.exports = KafkaClient