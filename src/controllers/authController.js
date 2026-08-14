const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const authController = {
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password } = req.body;
            const user = await authService.registerUser({ name, email, password });

            res.status(201).json({
                message: 'User registered successfully',
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            if (error.message === 'User already exists') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server error' });
        }
    },

    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const { user, token } = await authService.loginUser({ email, password });

            res.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({
                message: 'Login successful',
                user: { id: user.id, name: user.name, email: user.email },
                token
            });
        } catch (error) {
            if (error.message === 'Invalid credentials') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = authController;
