const request = require('supertest');
const sinon = require('sinon');
const { app } = require('../webserver');

describe('Webserver API Tests', () => {
    it('should respond with 200 and JSON content type for GET /', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should respond with 201 for successful resource creation on POST /user', (done) => {
        request(app)
            .post('/user')
            .send({ name: 'John Doe', age: 30 }) // Simulate valid data
            .expect(201, done);
    });

    it('should respond with 204 for successful resource deletion on DELETE /user', (done) => {
        request(app)
            .delete('/user')
            .expect(204, done);
    });

    it('should respond with 404 for a missing route', (done) => {
        request(app)
            .get('/nonexistent-route')
            .expect(404, done);
    });

    it('should respond with 400 for a bad request on POST /', (done) => {
        request(app)
            .post('/')
            .send({ invalid: 'data' }) // Simulate a bad request
            .expect(400, done);
    });

    it('should respond with 500 for server errors on PUT /user', (done) => {
        request(app)
            .put('/user')
            .send({ simulateError: true }) // Trigger the simulated error
            .expect(500, done);
    });

    // Test for PUT /user without simulateError
    it('should respond with 200 for successful PUT /user without simulateError', (done) => {
        request(app)
            .put('/user')
            .send({}) // No simulateError in the body
            .expect(200, { message: 'Resource updated successfully' }, done);
    });

    // Test for unsupported Content-Type
    it('should respond with 415 for unsupported Content-Type', (done) => {
        request(app)
            .post('/user')
            .set('Content-Type', 'text/plain') // Unsupported Content-Type
            .send('name=John&age=30') // Plain text payload
            .expect(415, done);
    });

    // Test for DELETE /user with query params
    it('should respond with 204 for DELETE /user even with query params', (done) => {
        request(app)
            .delete('/user?force=true') // Add query params
            .expect(204, done);
    });

    // Test for undefined HTTP methods
    it('should respond with 404 for undefined HTTP methods', (done) => {
        request(app)
            .patch('/user') // PATCH is not defined for /user
            .expect(404, done);
    });
});
