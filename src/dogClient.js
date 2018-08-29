class DogClient {

    constructor() {
        this.axios = require('axios');
    }

    async fetchRandomDogImage() {
        const response = await this.axios.get('https://dog.ceo/api/breeds/image/random');
        return response.data.message;
    }
}

module.exports = DogClient;