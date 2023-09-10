// 3　EventEmitterとストリーム
// *************************************************
// 3.2　ストリーム
// *************************************************
import * as fs from 'fs';
function copyFile(src, dest, cb) {
	// ファイルの読み込み
	fs.readFile(src, (err, data) => {
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

copyFileWithStream('src.txt', 'dest.txt', () => console.log('コピー完了'));

import * as crypto from 'crypto';
fs.createReadStream('src.txt')
	.pipe(crypto.createHash('sha256'))
	.pipe(fs.createWriteStream('dest.txt'))
	.on('finish', () => console.log('コピー完了'));

// 3.2.2　読み込みストリーム
// *************************************************
const readStream = fs.createReadStream('src.txt');
readStream
	.on('readable', () => {
		console.log('readble');
		let chunk;
		// 現在読み込み可能なデータをすべて読み込む
		while ((chunk = readStream.read()) !== null) {
			console.log(`chunk: ${chunk.toString()}`);
		}
	})
	.on('end', () => console.log('end'));

// node --experimental-repl-await
import * as stream from 'stream';
class HelloReadbleStream extends stream.Readable {
	languages: string[];
	constructor(options) {
		super(options);
		this.languages = ['JavaScript', 'Python', 'Java', 'C#'];
	}

	_read(size) {
		console.log('_read()');
		let language;
		while ((language = this.languages.shift())) {
			// push()でデータを流す
			// ただし、push()がfalseを返したらそれ以上流さない
			if (!this.push(`Hello, ${language}!\n`)) {
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
helloReadableStream
	.on('readable', () => {
		console.log('readable');
		let chunk;
		while ((chunk = helloReadableStream.read()) !== null) {
			console.log(`chunk: ${chunk.toString()}`);
		}
	})
	.on('end', () => console.log('end'));

// 3.2.3　書き込みストリーム
// *************************************************
// node --experimental-repl-await

const fileWriteStream = fs.createWriteStream('dest.txt');

fileWriteStream.write('Hello\n');

fileWriteStream.write('World\n');

fileWriteStream.end();

fs.readFileSync('dest.txt', 'utf8');

class DelayLogStream extends stream.Writable {
	constructor(options) {
		// objectMode:trueを指定するとオブジェクトをデータとして流せる
		super({ objectMode: true, ...options });
	}

	_write(chunk, encoding, callback) {
		console.log('_write()');
		const { message, delay } = chunk;
		setTimeout(() => {
			console.log(message);
			callback();
		}, delay);
	}
}

const delayLogStream = new DelayLogStream({});

delayLogStream.write({ message: 'Hi', delay: 1000 });

delayLogStream.write({ message: 'Bye', delay: 100 });

// 3.2.4　二重ストリームと変換ストリーム
// *************************************************
// node --experimental-repl-await
class LineTransformStream extends stream.Transform {
	// 上流から受け取ったデータのうち、下流に流していない分を保持するフィールド
	remaining = '';
	constructor(options) {
		//push()にオブジェクトを渡せるようにする
		super({ readableObjectMode: true, ...options });
	}

	_transform(chunk, encoding, callback) {
		console.log('_transform()');
		const lines = (chunk + this.remaining).split(/\n/);
		// 最後の行は次に入ってくるデータの先頭と同じ行になるため、変数に保持
		if (lines.length) this.remaining = lines.pop();
		for (const line of lines) {
			// ここではpush()の戻り値は気にしない
			this.push({ message: line, delay: line.length * 100 });
		}
		callback();
	}

	_flush(callback) {
		console.log('_flush()');
		this.push({
			message: this.remaining,
			delay: this.remaining.length * 100,
		});
	}
}

const lineTransformStream = new LineTransformStream({});
lineTransformStream.on('readable', () => {
	let chunk;
	while ((chunk = lineTransformStream.read()) !== null) {
		console.log(chunk);
	}
});

lineTransformStream.write('foo\nbar');

lineTransformStream.write('baz');

lineTransformStream.end();

const myWritable = new stream.Writable({
	write(chunk, encoding, callback) {
		// _write()メソッドの実装
	},
});

// 3.2.5　pipe()によるストリームの連結
// *************************************************
new HelloReadbleStream({})
	.pipe(new LineTransformStream({}))
	.pipe(new DelayLogStream({}))
	.on('finish', () => console.log('完了'));
