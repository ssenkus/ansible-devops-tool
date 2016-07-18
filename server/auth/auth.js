module.exports = function (req, res, next) {

    var basicAuth = require('basic-auth'),
        user = basicAuth(req);

    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === 'testtest' && user.pass === 'automation') {
        return next();
    } else {
        return unauthorized(res);
    }

}