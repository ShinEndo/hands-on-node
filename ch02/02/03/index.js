// 2.2.3　混ぜるな危険、同期と非同期
// *************************************************
function parseJSONAsync(json, callback) {
    setTimeout(function () {
        try {
            callback(null, JSON.parse(json));
        }
        catch (err) {
            callback(err);
        }
    }, 1000);
}
;
var cache2 = {};
function parseJSONAsyncWithCache(json, callback) {
    var cached = cache2[json];
    if (cached) {
        // キャッシュに値が存在する場合でも、非同期的にコールバックを実行する
        setTimeout(function () { return callback(cached.err, cached.result); }, 0);
        return;
    }
    parseJSONAsync(json, function (err, result) {
        cache2[json] = { err: err, result: result };
        callback(err, result);
    });
}
parseJSONAsyncWithCache('{"message":"Hello","to":"World"}', function (err, result) {
    console.log('1回目の結果', err, result);
    parseJSONAsyncWithCache('{"message":"Hello","to":"World"}', function (err, result) {
        console.log('2回目の結果', err, result);
    });
    console.log('2回目の呼び出し完了');
});
console.log('1回目の呼び出し完了');
