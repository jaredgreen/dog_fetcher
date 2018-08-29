const DogClient = require('../src/dogClient');
const nock = require('nock');

const DOG_IMAGE = "https://images.dog.ceo/breeds/cairn/n02096177_133.jpg";
const FAKE_DOG_MESSAGE = {
    message: DOG_IMAGE
};
const DUMB_RESPONSE = {
    data: {}
}
const MOCK_RESPONSE = {
    data: FAKE_DOG_MESSAGE
}
describe('DogClient', () => {

    it('fetchRandomDogImage returns a dog image - real', async () => {
        const dogClient = new DogClient();

        const dog = await dogClient.fetchRandomDogImage();

        expect(dog).toContain('https://images.dog.ceo/breeds/');
    });

    it('fetchRandomDogImage returns a dog image - jest expect', async () => {
        const dogClient = new DogClient();
        const mockGet = jest.fn(() => { return DUMB_RESPONSE });
        dogClient.axios.get = mockGet;

        const dog = await dogClient.fetchRandomDogImage();

        expect(mockGet).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random');
    });

    it('fetchRandomDogImage returns a dog image - jest stub response', async () => {
        const dogClient = new DogClient();
        const mockGet = jest.fn(() => { return MOCK_RESPONSE });
        dogClient.axios.get = mockGet;

        const dog = await dogClient.fetchRandomDogImage();

        expect(dog).toEqual(DOG_IMAGE);
    });

    it('fetchRandomDogImage returns a dog image - nock', async () => {
        nock('https://dog.ceo/api').get('/breeds/image/random').reply(200, FAKE_DOG_MESSAGE);
        const dogClient = new DogClient();

        const dog = await dogClient.fetchRandomDogImage();

        expect(dog).toEqual(DOG_IMAGE);
    });

});