// 5　HTTPサーバとHTTPクライアント
// *************************************************
// 5.3 WebアプリケーションフレームワークとExpress
// *************************************************
// 5.3.1 ルーティング
// *************************************************

const express = require('express');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		// GETリクエストに対する処理を記述
		// ・・・
	})
	.post((req, res) => {
		// POSTリクエストに対する処理を記述
		// ・・・
	});

router.route('/:id(\\d+)', (req, res) => {
	const todoId = Number(req.params.id);
	console.log(todoId);
	// ・・・
});

module.exports = router;
