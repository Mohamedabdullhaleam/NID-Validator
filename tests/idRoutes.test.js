const request = require('supertest');
const app = require('../src/index');

describe('National ID Validation Endpoint', () => {
    it('should validate and extract data from a valid ID from Beheira', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804180101856' }); 

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body).toMatchObject({
            birthDate: '1998-04-18',
            gender: 'Male',
            governorate: 'Cairo'
        });
    });

    it('should validate and extract data from a valid ID from Cairo', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804180101234' }); // ID with Cairo governorate code "01"

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body).toMatchObject({
            birthDate: '1998-04-18',
            gender: 'Male',
            governorate: 'Cairo'
        });
    });


    it('should correctly parse birth date for a 1900s birth date', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804180101234' }); // Century code "2" for 1998

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body.birthDate).toBe('1998-04-18');
    });

    it('should correctly parse birth date for a 2000s birth date', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '30504180101234' }); // 2005

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body.birthDate).toBe('2005-04-18');
    });

    // Test invalid dates within months
    it('should return 400 for an ID with an invalid date of February 30', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29802300101234' }); // February 30, which is invalid

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.error).toBe('Invalid birth date');
    });

    it('should return 400 for an ID with an invalid date of April 31', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804310101234' }); // April 31, which is invalid

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.error).toBe('Invalid birth date');
    });

    // Test leap year date (valid February 29)
    it('should correctly validate an ID with February 29 on a leap year', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29602290101234' }); // February 29, 1996 (leap year)

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body.birthDate).toBe('1996-02-29');
    });

    // Test leap year date (invalid February 29 on a non-leap year)
    it('should return 400 for an ID with February 29 on a non-leap year', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29902290101234' }); // February 29, 1999 (not a leap year)

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.error).toBe('Invalid birth date');
    });

    // Test gender extraction
    it('should identify gender as Male for an odd gender digit', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804180101235' }); // ID ending with odd digit "5"

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body.gender).toBe('Male');
    });

    it('should identify gender as Female for an even gender digit', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804180101234' });

        expect(response.status).toBe(200);
        expect(response.body.valid).toBe(true);
        expect(response.body.gender).toBe('Male');
    });

    // Test missing ID and format validation
    it('should return 400 if ID is missing from the request body', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.error).toBe('ID is required');
    });

    it('should return 400 for an ID that is not 14 digits', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '1234567890123' }); 

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.error).toBe('ID must be exactly 14 digits');
    });

    it('should return 400 for an ID containing non-numeric characters', async () => {
        const response = await request(app)
            .post('/api/nid/validate')
            .send({ id: '29804A80101234' }); 

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.error).toBe('ID must be exactly 14 digits');
    });
});
