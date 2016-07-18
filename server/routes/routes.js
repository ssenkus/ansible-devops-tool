module.exports = function (app) {

    var inventory = require('../controllers/inventory'),
        views = require('../controllers/views');
        auth = require('../auth/auth');

    app.get('/', auth, views.index);
    app.get('/inventory', auth, inventory.getInventory);


}