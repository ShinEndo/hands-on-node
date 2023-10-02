// 5　HTTPサーバとHTTPクライアント
// *************************************************
// 5.1 ToDo管理アプリケーション
// *************************************************
// 5.2 httpモジュールの利用
// *************************************************
const http = require('http');
const todos = [
	{ id: 1, title: 'ネーム', completed: false },
	{ id: 2, title: '下書き', completed: true },
];

// HTTPサーバーの初期化
const server = http
	.createServer((req, res) => {
		// リクエストのURLやHTTPメソッドに応じて適切なレスポンスを返す
		if (req.url === '/api/todos') {
			if (req.method === 'GET') {
				res.setHeader('Content-Type', 'application/json');
				return res.end(JSON.stringify(todos));
			}
			// GET以外のHTTPメソッドはサポートしないため405（Method Not Allowed）
			res.statusCode = 405;
		} else {
			// /api/todos以外のURLはないので404（Not Found）
			res.statusCode = 404;
		}
		res.end();
	})
	.listen(3000);

// HTTPリクエスト（POST)
http.request('http://localhost:3000/api/todos', { method: 'POST' }, (res) =>
	console.log('statusCode', res.statusCode)
).end();
