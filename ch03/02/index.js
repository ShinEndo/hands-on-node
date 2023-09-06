"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 3　EventEmitterとストリーム
// *************************************************
// 3.2　ストリーム
// *************************************************
var fs = require("fs");
function copyFile(src, dest, cb) {
    // ファイルの読み込み
    fs.readFile(src, function (err, data) {
        if (err) {
            return cb(err);
        }
        // 読み込んだ内容を別のファイルに書き出す
        fs.writeFile(dest, data, cb);
    });
}
// 3.2.1　ストリームの基本
// *************************************************
function copyFileWithStream(src, dest, cb) {
    // ファイルから読み込みストリームを生成
    fs.createReadStream(src).pipe(fs.createWriteStream(dest)).on('finish', cb);
}
fs.writeFileSync('src.txt', 'Hello,World!');
copyFileWithStream('src.txt', 'dest.txt', function () { return console.log('コピー完了'); });
var crypto = require("crypto");
fs.createReadStream('src.txt').pipe(crypto.createHash('sha256')).pipe(fs.createWriteStream('dest.txt')).on('finish', function () { return console.log('コピー完了'); });
