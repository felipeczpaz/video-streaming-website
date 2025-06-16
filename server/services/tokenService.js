const Token = require('../models/Token');

async function storeToken(userId, token) {
    const newToken = new Token({ userId, token });
    await newToken.save();
}

module.exports = {
    storeToken
};
