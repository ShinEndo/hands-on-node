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

