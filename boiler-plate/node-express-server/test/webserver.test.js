const request = require('supertest');
const sinon = require('sinon'); // Import sinon for mocking
const { app, userAgent } = require('../webserver'); // Import app and userAgent

describe('Web Server', () => {
    let consoleSpy;

    beforeEach(() => {
        // Set up a fresh spy before each test
        consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        // Restore the original console.log after each test
        consoleSpy.restore();
    });

    it('should respond with a 200 status code for GET /', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('should return the correct response body for GET /', (done) => {
        request(app)
            .get('/')
            .expect('Hello Express!', done);
    });

    it('should respond with 404 for an unknown route', (done) => {
        request(app)
            .get('/unknown')
            .expect(404, done);
    });

    it('should ensure user agent is logged for POST /', (done) => {
        request(app)
            .post('/')
            .end(() => {
                sinon.assert.calledWithMatch(consoleSpy, sinon.match(/Mozilla\//)); // Match using a regex
                done();
            });
    });

    it('should ensure user agent is logged for PUT /user', (done) => {
        request(app)
            .put('/user')
            .end(() => {
                sinon.assert.calledWithMatch(consoleSpy, sinon.match(/Mozilla\//)); // Match using a regex
                done();
            });
    });

    it('should ensure user agent is logged for DELETE /user', (done) => {
        request(app)
            .delete('/user')
            .end(() => {
                sinon.assert.calledWithMatch(consoleSpy, sinon.match(/Mozilla\//)); // Match using a regex
                done();
            });
    });

    it('should respond with 405 for an unsupported HTTP method on /user', (done) => {
        request(app)
            .patch('/user')
            .expect(405, done);
    });

    it('should return JSON content type for GET /', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should respond with 404 for a completely missing route', (done) => {
        request(app)
            .get('/nonexistent-route')
            .expect(404, done);
    });

    it('should handle requests to the /user directory correctly', (done) => {
        request(app)
            .get('/user')
            .expect(404, done);
    });
});