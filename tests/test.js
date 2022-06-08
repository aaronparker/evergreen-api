const request = require('supertest')('https://evergreen-api.stealthpuppy.com');
const assert = require('chai').assert;

// Make a GET request to the apps route
describe('Apps API', () => {
    it('GET /apps', () => {
        // Make a GET request to the apps route 
        return request
            .get('/apps')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                // assert data being return to not be empty
                assert.isNotEmpty(res.body);
            });
    });
});

// Make a GET request to the app route
describe('App API', () => {
    it('GET /app/MicrosoftEdge', () => {
        return request
            .get('/app/MicrosoftEdge')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                // assert data being return to not be empty
                assert.isNotEmpty(res.body);
            });
    });
});
