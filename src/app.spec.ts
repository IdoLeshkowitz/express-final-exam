import app from './app';
import request from 'supertest';

const ValidRequestPayload = {
    height: '180',
    heightUnit: '0',
    weight: '80',
    weightUnit: '0'
};

const FormPayload = new URLSearchParams(ValidRequestPayload).toString();

describe('E2E (endpoints testing)', () => {

    describe('POST', () => {
        it('should response to FORM data', () => {
            return request(app)
                .post('/bmi')
                .send(FormPayload)
                .expect(200);
        });

        it.skip('should response to JSON data', () => {
            return request(app)
                .post('/bmi')
                .set('content-type', 'application/json')
                .send(ValidRequestPayload)
                .expect(200);
        });
    });
});

describe('GET /bmi', () => {
    it('should return 400 for a request without weight param', () => {
        return request(app)
            .get(`/bmi?height=180&heightUnit=0&weightUnit=0`)
            .expect(400);
    })
    it('should return 200 for a request with the right query params', function () {
        return request(app)
            .get(`/bmi?weight=3.1&weightUnit=0&height=1&heightUnit=1`)
            .expect(200);

    });
})

describe('POST /bmi', () => {
    it('should return 200 for a request with the right body params', function () {
        return request(app)
            .post(`/bmi`)
            .set('content-type', 'application/json')
            .send({weight: 3.1, weightUnit: 0, height: 1, heightUnit: 1})
            .expect(200);
    })
})