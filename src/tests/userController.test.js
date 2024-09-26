const { registerUser, loginUser } = require('../controllers/userController');
const User = require('../models/User');
const httpMocks = require('node-mocks-http');

jest.mock('../models/User');

describe('User Controller - Register and Login', () => {
    it('should register a user successfully', async () => {
        const req = httpMocks.createRequest({
            body: { username: 'kakashi', password: 'sharingan123' },
        });
        const res = httpMocks.createResponse();

        User.findOne.mockResolvedValue(null);
        User.prototype.save.mockResolvedValue({ _id: '12345', username: 'kakashi' });

        await registerUser(req, res);
        expect(res.statusCode).toBe(201);
    });

    it('should return an error if user already exists', async () => {
        const req = httpMocks.createRequest({
            body: { username: 'kakashi', password: 'sharingan123' },
        });
        const res = httpMocks.createResponse();

        User.findOne.mockResolvedValue({ username: 'kakashi' });

        await registerUser(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'User already exists' });
    });
});
