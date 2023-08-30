// 2.2.3.1　コールバックの実行を非同期化するのに使用するAPI
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
var cache3 = {};
function parseJSONAsyncWithCache(json, callback) {
    var cached = cache3[json];
    if (cached) {
        // Node.jsのみを対象としたコードの場合
        process.nextTick(function () { return callback(cached.err, cached.result); });
        return;
    }
    parseJSONAsync(json, function (err, result) {
        cache3[json] = { err: err, result: result };
        callback(err, result);
    });
}
// 1回目の実行
parseJSONAsyncWithCache('{"message":"Hello","to":"World"}', function (err, result) {
    console.log('1回目の結果', err, result);
    // コールバックの中で2回目を実行
    parseJSONAsyncWithCache('{"message":"Hello","to":"World"}', function (err, result) {
        console.log('2回目の結果', err, result);
    });
    console.log('2回目の呼び出し完了');
});
console.log('1回目の呼び出し完了');
