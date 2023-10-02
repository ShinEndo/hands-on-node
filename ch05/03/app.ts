// 5　HTTPサーバとHTTPクライアント
// *************************************************
// 5.3 WebアプリケーションフレームワークとExpress
// *************************************************
// 5.3.1 ルーティング
// *************************************************

const express = require('express');
const app = express();

app.use('/api/todos', require('./routes/todos'));

app.listen(3000);

new URL('/api/todos?completed=true', 'http://localhost:3000');
