const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');

const authService = {
    registerUser: async ({ name, email, password }) => {
        const existingUser = await userDao.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userDao.createUser({
            name,
            email,
            password: hashedPassword
        });

        return user;
    },

    loginUser: async ({ email, password }) => {
        const user = await userDao.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return { user, token };
    }
};

module.exports = authService;
