const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const db = require('../models');
const Token = db.token;

class TokenService {
    async createToken(payload) {
        const token = jwt.sign(payload, 
            config.secret, {
            expiresIn: config.jwtExpiration
        });
        const refreshToken = jwt.sign(payload, 
            config.secret, {
            expiresIn: config.jwtRefreshExpiration
        });
        return {
            token,
            refreshToken
        }
    }

    async saveToken(username, refreshToken) {
        const tokenData = await Token.findOne({
            where: {
                userId: username
            }
        });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await Token.create({
            userId: username,
            refreshToken
        });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({
            where: {
                refreshToken: refreshToken
            }
        });
        return tokenData;
    }
}

module.exports = new TokenService();