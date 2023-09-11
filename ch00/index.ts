// 0 TypeScriptでNode.jsを実行できるようにする
// *************************************************
import * as http from 'http';

// httpサーバーを設定する
const server = http.createServer((req, res) => {
	res.end('Hello! Node.js');
});
// サーバーを起動する
server.listen(3000);
console.log(`http://localhost:3000`);
