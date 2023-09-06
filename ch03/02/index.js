"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// 3.2.2　読み込みストリーム
// *************************************************
var readStream = fs.createReadStream('src.txt');
readStream.on('readable', function () {
    console.log('readble');
    var chunk;
    // 現在読み込み可能なデータをすべて読み込む
    while ((chunk = readStream.read()) !== null) {
        console.log("chunk: ".concat(chunk.toString()));
    }
}).on('end', function () { return console.log('end'); });
// node --experimental-repl-await
var stream = require("stream");
var HelloReadbleStream = /** @class */ (function (_super) {
    __extends(HelloReadbleStream, _super);
    function HelloReadbleStream(options) {
        var _this = _super.call(this, options) || this;
        _this.languages = ['JavaScript', 'Python', 'Java', 'C#'];
        return _this;
    }
    HelloReadbleStream.prototype._read = function (size) {
        console.log('_read()');
        var language;
        while ((language = this.languages.shift())) {
            // push()でデータを流す
            // ただし、push()がfalseを返したらそれ以上流さない
            if (!this.push("Hello, ".concat(language, "!\n"))) {
                console.log('読み込み中断');
                return;
            }
        }
        // 最後にnullを流してストリームの終了を通知する
        console.log('読み込み完了');
        this.push(null);
    };
    return HelloReadbleStream;
}(stream.Readable));
var options = {};
var helloReadableStream = new HelloReadbleStream(options);
helloReadableStream.on('readable', function () {
    console.log('readable');
    var chunk;
    while ((chunk = helloReadableStream.read()) !== null) {
        console.log("chunk: ".concat(chunk.toString()));
    }
}).on('end', function () { return console.log('end'); });
