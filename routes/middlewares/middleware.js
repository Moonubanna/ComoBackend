//const settings = require('../../config/settings');
const globalFunction = require('../../utils/globalFunction');
//const CONSTANTS = require('../../utils/constants');
const apiUnauthorizedRes = globalFunction.apiUnauthorizedRes;

var middleware = function (req, res, next) {

    const ignored_routes = [
        '/api/v5/qrcode',

    ];
    if (ignored_routes.includes(req.path)) {
        next();
    } else {
        let token = req.headers.authorization.split(' ');
        let findToken = global._blacklistToken.findIndex((element) => element.token === token[token.length - 1]);
        if (findToken >= 0) {
            return apiUnauthorizedRes(req, res, 'Your token is expire.');
        }
        next();
    }

};
module.exports = middleware;