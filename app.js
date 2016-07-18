var express = require('express'),
    child_process = require('child_process'),
    http = require('http'),
    socketIO = require('socket.io'),
    bodyParser = require('body-parser'),
    routes = require('./server/routes/routes.js');

var spawn = child_process.spawn,
    app = express(),
    server = http.Server(app),
    io = socketIO(server);


var MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static('public'));

routes(app);


server.listen(3000, function () {
    var port = server.address().port;
    console.log('AnsibleApp listening at http://%s:%s', 'localhost', port);
});

io.on('connection', function (socket) {
    socket.on('command', function (data) {
        var commands = [];

        data.playbooks.forEach(function (el, i) {
            var command = [
                'ansible-playbook',
                '-i ./inventory/' + data.inventoryFile,
                './playbooks/' + el + '.yml'
            ];
            if (data.debug) {
                command.push('-vvvv');
            }
            if (data.input) {
                command.push('--extra-vars "' + data.input + '"');
            }
            commands.push(command.join(' '));
        });
        runCommands(socket, commands, function () {
            socket.emit('out', {
                done: true,
            });
        });
    });
});


function runCommands(socket, commands, callback) {
    var command = commands.shift().split(' ');
    var process = spawn(command[0], command.slice(1));

    var fullData = '';

    var outputHandler = function (data) {
        fullData += data.toString();
        socket.emit('out', {
            command: command,
            output: data.toString(),
        });
    };

    outputHandler("\n\n> " + command.join(' ') + "\n");
    process.stdout.on('data', outputHandler);
    process.stderr.on('data', outputHandler);


    process.on('close', function (code) {
        if (code === 0 && commands.length > 0) {
            runCommands(socket, commands, callback);
        } else {
            saveCommandOutput(fullData);
            callback();
        }
    });
}

function saveCommandOutput(commandOutput) {

    console.log(commandOutput);
    MongoClient.connect('mongodb://localhost:27017/devopsdb', function (err, db) {
        if (err) {
            throw err;
        }
        console.log('connected to mongo');

        var collection = db.collection('command_history');

        //Test command output
        var command = {
            timestamp: Math.floor(new Date() / 1000),
            output: commandOutput
        };

        // Insert some users
        collection.insert(command, function (err, result) {
            console.log(result);
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully inserted command output to mongodb collection "command_history"');
            }

            db.close();
        });
    });
}