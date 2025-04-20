const {factory} = require("@factory-js/factory")
const {faker} = require("@faker-js/faker")

class UserFactory{
    constructor(){
        this.factory = factory.define({
            props:{
                name: () => faker.internet.displayName(),
                email: () => faker.internet.email(),
                password: () => faker.internet.password(),
            },
            vars:{},
        })
    }

    async build(){
        return await this.factory.build()
    }
}

module.exports = UserFactory