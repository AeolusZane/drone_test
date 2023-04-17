const shelljs = require('shelljs');
const Rsync = require('rsync');
const path = require('path');
const argv = require('yargs').argv;

const [targetName] = argv._;

const host_map = {
    'test01': 'root@192.168.101.78'
}

function echo(msg) {
    shelljs.exec(`curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=693axxx6-7aoc-4bc4-97a0-0ec2sifa5aaa' \
    -H 'Content-Type: application/json' \
    -d '
    {
         "msgtype": "text",
         "text": {
             "content": "${msg}"
         }
    }'`);
}

if(!host_map[targetName]) {
    echo('Error: targetName is not exist');
    shelljs.exit(1);
}

// clean
echo('clean');
if (shelljs.exec('npm run clean').code !== 0) {
    echo('Error: npm clean failed');
    shelljs.exit(1);
}

// install dependencies
echo('install dependencies');
if (shelljs.exec('npm install').code !== 0) {
    echo('Error: npm install failed'); // 或使用群聊机器人发通知
    shelljs.exit(1);
}

// test
echo('test');
if (shelljs.exec('npm run test').code !== 0) {
    echo('Error: npm test failed');
    shelljs.exit(1);
}

// build
echo('build');
if (shelljs.exec('npm run build').code !== 0) {
    echo('Error: npm build failed');
    shelljs.exit(1);
}

// deploy
echo('deploy');
const rsync = Rsync.build({
    source: path.join(__dirname, './build/*'),
    destination: `${host_map[targetName]}:/root`,
    shell: 'ssh',
    flags: 'avz',
});

rsync.execute(function (error, code, cmd) {
    // we're done
    echo(error, code, cmd);
});