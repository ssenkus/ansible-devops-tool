var fs = require('fs'),
    express = require('express'),
    basicAuth = require('basic-auth'),
    child_process = require('child_process'),
    http = require('http'),
    socketIO = require('socket.io'),
    bodyParser = require('body-parser');


var spawn = child_process.spawn,
    app = express(),
    server = http.Server(app),
    io = socketIO(server);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static('public'));

app.get('/', auth, function (req, res) {
    fs.createReadStream('./public/index.html').pipe(res)
});


app.get('/inventory', auth, function (req, res) {
    var inventoryFile = req.query.inventoryFile;

    if (inventoryFile) {
        fs.readFile('./inventory/' + inventoryFile, 'utf8', function (err, data) {
            if (err) {
                return console.log('error', err);
            }
            res.send({fileContents: data});
        });
    }
});


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


function auth(req, res, next) {

    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }
    ;

    if (user.name === 'testtest' && user.pass === 'automation') {
        return next();
    } else {
        return unauthorized(res);
    }
    ;
}

function runCommands(socket, commands, callback) {
    var command = commands.shift().split(' ');
    var process = spawn(command[0], command.slice(1));
    var outputHandler = function (data) {
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
            callback();
        }
    });
}