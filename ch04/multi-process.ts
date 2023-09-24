// 4.2　clusterモジュールによるマルチプロセス化
// *************************************************
// 4.2.1　Webアプリケーションのマルチプロセス化
// *************************************************
import cluster from 'node:cluster';

console.log('メインプロセス', process.pid);

// サブプロセスが実行するファイルの指定
cluster.setupPrimary({exec: `${__dirname}/web-app`});

cluster.setupPrimary

// CPUコアの数だけプロセスをフォーク
const cpuCount = require("os").cpus().length;
for(let i = 0; i  < cpuCount; i++) {
    const sub = cluster.fork();
    console.log("サブプロセス",sub.process.pid);
}