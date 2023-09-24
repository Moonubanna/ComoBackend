const expressJwt = require('express-jwt');
const settings = require('../../config/settings');
const userModel = require('../model/userModel');
module.exports = jwt;

function jwt() {
    const secret = settings.secret;
    return expressJwt({
        secret,
        isRevoked
    }).unless({
        path: [
            { url: /^\/upload\/.*/, methods: ['GET'] },
            { url: settings.API_URL + "/qrcode", methods: ['GET'] },
            { url: settings.API_URL + "/scans", methods: ['GET'] },
        ]
    });
}
async function isRevoked(req, payload, done) {
    req.headers.id = payload.sub.id;
    userModel.setUserData(payload.sub);
    done();
}