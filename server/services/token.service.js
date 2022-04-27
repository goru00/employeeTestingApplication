const jwt = require('jsonwebtoken');
const AuthConfig = require('../configs/auth.config');
const db = require('../models');
const Token = db.token;

class TokenService {
    async createToken(payload) {
        const token = jwt.sign(payload, 
            AuthConfig.secretAccessToken, {
            expiresIn: AuthConfig.jwtExpiration
        });
        const refreshToken = jwt.sign(payload, 
            AuthConfig.secretRefreshToken, {
            expiresIn: AuthConfig.jwtRefreshExpiration
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

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, AuthConfig.secretAccessToken);
            return userData;
        } catch (e) {
            console.error(e)
        }
    }

    async validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, AuthConfig.secretRefreshToken);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({
            where: {
                refreshToken: refreshToken
            }
        });
        return tokenData;
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({
            where: {
                refreshToken
            }
        });
        return token;   
    }
}

module.exports = new TokenService();