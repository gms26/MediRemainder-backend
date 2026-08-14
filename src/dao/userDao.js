const User = require('../models/User');

const userDao = {
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },
    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },
};

module.exports = userDao;
