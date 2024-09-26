const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraire le token depuis l'en-tête Authorization
            token = req.headers.authorization.split(' ')[1];

            // Décoder le token pour obtenir l'ID de l'utilisateur
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attacher l'utilisateur au request object
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
