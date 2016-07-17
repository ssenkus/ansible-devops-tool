describe('socketHandler', function () {

    var _socketHandler;

    beforeEach(module('AnsibleApp'));

    beforeEach(inject(function (socketHandler) {
        _socketHandler = socketHandler,
        spyOn(io, 'connect');
    }));

    beforeEach(function() {
        _socketHandler.connectSocketIo();
    });

    it('should connect to a Socket.IO endpoint', function() {
        expect(io.connect).toHaveBeenCalled();
    });

    // TODO: fix this test, may require rework of socketHandler service
    it('should send a "command"  to a Socket.IO endpoint', function() {
        _socketHandler.connectSocketIo();
        var socket = _socketHandler.getSocket();

        _socketHandler.sendCommand({});
        expect(socket.emot).toHaveBeenCalledWith({});
    });

});