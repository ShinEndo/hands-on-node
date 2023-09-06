// 3　EventEmitterとストリーム
// *************************************************
// 3.2　ストリーム
// *************************************************
import * as fs from 'fs';
function copyFile(src,dest,cb) {
    // ファイルの読み込み
    fs.readFile(src,(err,data)=>{
        if(err) {
            return cb(err);
        }
        // 読み込んだ内容を別のファイルに書き出す
        fs.writeFile(dest,data,cb);
    })
}

// 3.2.1　ストリームの基本
// *************************************************
function copyFileWithStream(src,dest,cb) {
    // ファイルから読み込みストリームを生成
    fs.createReadStream(src).pipe(fs.createWriteStream(dest)).on('finish',cb);
}

fs.writeFileSync('src.txt','Hello,World!');

copyFileWithStream('src.txt','dest.txt',()=>console.log('コピー完了'));

import * as crypto from 'crypto';
fs.createReadStream('src.txt').pipe(crypto.createHash('sha256')).pipe(fs.createWriteStream('dest.txt')).on('finish',()=>console.log('コピー完了'));

// 3.2.2　読み込みストリーム
// *************************************************
const readStream = fs.createReadStream('src.txt');
readStream.on('readable',()=>{
    console.log('readble');
    let chunk;
    // 現在読み込み可能なデータをすべて読み込む
    while((chunk = readStream.read()) !== null) {
        console.log(`chunk: ${chunk.toString()}`);
    }
}).on('end',()=>console.log('end'));

// node --experimental-repl-await
import * as stream from 'stream';
class HelloReadbleStream extends stream.Readable {

    languages: string[];
    constructor(options) {
        super(options);
        this.languages = ['JavaScript','Python','Java','C#'];
    }

    _read(size) {
        console.log('_read()');
        let language;
        while((language = this.languages.shift())){
            // push()でデータを流す
            // ただし、push()がfalseを返したらそれ以上流さない
            if(!this.push(`Hello, ${language}!\n`)){
                console.log('読み込み中断');
                return;
            }
        }
        // 最後にnullを流してストリームの終了を通知する
        console.log('読み込み完了');
        this.push(null);
    }
}
const options = {};
const helloReadableStream = new HelloReadbleStream(options);
helloReadableStream.on('readable',()=>{
    console.log('readable');
    let chunk;
    while((chunk = helloReadableStream.read()) !== null) {
        console.log(`chunk: ${chunk.toString()}`);
    }
}).on('end',()=>console.log('end'))