const ipc = require('node-ipc');
const Database = require('./db');

ipc.config.id = 'world';
ipc.config.retry= 1500;

ipc.serveNet(
    'udp4',
    function(){
        ipc.server.on(
            'message',
            function(data,socket){
                ipc.log('got a message from ', data.id ,' : ', data.message);
                const db = Database();
                const queryResult = db.raw(data.message).run();
                ipc.server.emit(
                    socket,
                    'message',
                    {
                        id      : ipc.config.id,
                        message : data.message+' world!',
                        result : `This is the result of the query ${JSON.stringify(queryResult)}`,
                    }
                );
            }
        );
    }
);



ipc.server.start();