// 4.2　clusterモジュールによるマルチプロセス化
// *************************************************
// 4.2.2　IPC(プロセス間通信)
// *************************************************
import cluster from 'node:cluster';

console.log("メインプロセス", process.pid);

cluster.setupPrimary({exec: `${__dirname}/web-app`});

const cpuCount = require("os").cpus().length;
for(let i = 0; i < cpuCount; i++) {
    const sub = cluster.fork();
    console.log("サブプロセス",sub.process.pid);
    // IPCでサブプロセスにポート番号を送信
    sub.send(3000);
    // IPCで受信したメッセージをハンドリング
    sub.on('message', ({pid, response}) => {
        console.log(process.pid, `${pid}が${response}を返します`)
    })
}

export{}