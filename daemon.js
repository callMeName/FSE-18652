/**
 * Created by xuyuhao on 16/9/4.
 */

/**
 * Created by xuyuhao on 15/6/28.
 */
var cp = require('child_process');
var path = require('path');


var worker;

function spawn(server) {
    worker = cp.spawn('node', [ server], {
        stdio: 'inherit'
    });
    worker.on('exit', function (code) {
        if (code !== 0) {
            console.log("Error code ",code);
            spawn(server);
        }
    });

    //worker.stdout.
}

function main(argv) {
    console.log("start daemon");
    spawn(path.resolve(__dirname, 'bin','server.js'));
    process.on('SIGTERM', function () {
        worker.kill();
        process.exit(0);
    });
}

main();