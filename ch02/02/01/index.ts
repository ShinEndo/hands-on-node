// 2.2.1　コールバックを利用した非同期APIを実行する
// *************************************************
setTimeout(() => {
	console.log('1秒経過しました。');
}, 1000);
console.log('setTimeout()を実行しました。');

const array1 = [0, 1, 2, 3];
const array2 = array1.map((element) => {
	console.log(`${element}を変換します。`);
	return element * 10;
});
console.log('配列の変換が完了しました。', array2);

const fs = require('fs');
fs.readdir('.', (err: unknown, files: []) => {
	console.log('fs.readdir()実行結果');
	console.log('err', err);
	console.log('files', files);
});
fs.readdir('foo', (err: unknown, files: []) => {
	console.log('fs.readdir()実行結果');
	console.log('err', err);
	console.log('files', files);
});
