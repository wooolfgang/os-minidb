const ipc = require('node-ipc');

ipc.config.id = 'hello';
ipc.config.retry= 1500;

ipc.serveNet(
    8001,
    'udp4',
    function(){
        ipc.server.emit(
            {
                address : 'localhost',
                port    : ipc.config.networkPort
            },
            'message',
            {
                id      : ipc.config.id,
                message : 'FROM USERS INSERT {"age":"12121"}'
            }
        );
        ipc.server.emit(
            {
                address : 'localhost',
                port    : ipc.config.networkPort
            },
            'message',
            {
                id      : ipc.config.id,
                message : 'FROM USERS WHERE AGE EQUALS 12121'
            }
        );
    }
);


ipc.server.start();