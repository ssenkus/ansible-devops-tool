exports.getInventory = function (req, res) {

    var fs = require('fs');
    var inventoryFile = req.query.inventoryFile;

    if (inventoryFile) {
        fs.readFile('./inventory/' + inventoryFile, 'utf8', function (err, data) {
            if (err) {
                return console.log('error', err);
            }
            res.send({fileContents: data});
        });
    }


};