// 3.1.3　エラーハンドリング
// *************************************************
var events = require('events');
try {
    new events.EventEmitter()
        .on('error', function (err) { return console.log('errorイベント'); })
        .emit('error', new Error('エラー'));
}
catch (err) {
    console.log(err);
}
