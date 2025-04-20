const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const should = require('should');
       
    Given(/a (not-|)registered user/, async function (notRegistered) {
        this.context.newUser = await this.buildUser()
        if(!notRegistered){
            await this.apiClient.registerUser(this.context.newUser)
        }
    });
       
    When('Registration data is provided', async function () {
        this.context.response = 
                await this.apiClient.registerUser(this.context.newUser)
    });
       
       
    Then('the response message should indicate successful {string}', function (state) {
        const assertion = (status, message) => {this.context.response.status.should.equal(status)
        this.context.response.data.should.deepEqual({ message })}
        const select = {
            registration: () => assertion(201, "User registered successfully"),
            verification: () => assertion(200, "User verified successfully")
        }
        select[state]()
    });

    async function assertEmailReceived() {
        const email = this.context.newUser.email;
        this.context.message = await this.emailClient.waitForEmail(m => m.To.find(o=>o.Address===email))
        should.exist(this.context.message)
    }

    Then('a verfication email should be received', assertEmailReceived);

    Given('a received verification email', assertEmailReceived)


    Then('the {string} event should be logged', async function (topic) {
        const email = this.context.newUser.email;
        const log =  await this.dbClient.waitForDocument('audit_logs', {eventType: topic})
        log.payload.should.containEql({email})
    });

    When('the verification is accepted', async function () {
        const html = await this.context.message.getHTML()
        const token = html.split('t=')[1].split('">')[0]
        this.context.response = await this.apiClient.verifyUser(token)

    })