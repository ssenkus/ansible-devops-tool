angular.module('AnsibleApp').factory('socketHandler', ['CONFIG', function(CONFIG) {

    var socket = null;

    var socketHandler = {
        connectSocketIo: function() {
            socket = io.connect(CONFIG.SOCKET_ENDPOINT);
        },
        registerSocketHandlers: function(callback) {
            this.connectSocketIo();
            socket.on('out', callback);
        },
        sendCommand: function(options) {
            socket.emit('command', {
                name: options.name,
                debug: options.debug,
                inventoryFile: options.inventoryFile,
                playbooks: options.playbooks,
                input: options.input
            });
        },
        getSocket: function() {
            return socket;
        }
    };

    return socketHandler;

}]);