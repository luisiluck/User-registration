const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

class ApiClient{
    constructor(){
        this.apiClient = axios.create({
            baseURL: process.env.BASE_URL,
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }

    async registerUser(user) {
        return await this.apiClient.post('/register', user);
    }

    async verifyUser(token) {
        return await this.apiClient.get(`/verify?t=${token}`)
    }
}

module.exports = ApiClient
