const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
    createdAt: { type: Date, expires: '1h', default: Date.now } // Optional expiration
});

const Token = mongoose.model('Token', tokenSchema);

async function storeToken(userId, token) {
    const newToken = new Token({ userId, token });
    await newToken.save();
}

// Export the Token model and storeToken function
module.exports = {
    Token,
    storeToken
};
