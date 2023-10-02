// 5　HTTPサーバとHTTPクライアント
// *************************************************
// 5.3 WebアプリケーションフレームワークとExpress
// *************************************************
// 5.3.1 ルーティング
// *************************************************

const express = require('express');
const todos = [
	{ id: 1, title: 'ネーム', completed: false },
	{ id: 2, title: '下書き', completed: true },
];

const app = express();

// /api/todos/に対するGETリクエストを処理するハンドラ
app.get('/api/todos', (req, res) => {
	// ToDoの配列をJSON形式で返す
	res.json(todos);
});

app.post('/api/todos', (req, res) => {
	// POSTリクエストに対する処理を記述
	// ・・・
});

app.listen(3000);

export {};
