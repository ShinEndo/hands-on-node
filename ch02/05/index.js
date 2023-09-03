var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
// 2.5　async/await
// *************************************************
// 2.5.1　async/await構文の使い方
// *************************************************
function parseJSONAsync(json) {
    return new Promise((resolve, reject) => setTimeout(() => {
        try {
            resolve(JSON.parse(json));
        }
        catch (err) {
            reject(err);
        }
    }));
}
async function asyncFunc(json) {
    try {
        const result = await parseJSONAsync(json);
        console.log('パース結果', result);
    }
    catch (err) {
        console.log('エラーをキャッチ', err);
    }
}
// 正常系
asyncFunc('{"foo":1}');
// 異常系
asyncFunc('不正なJSON');
async function asyncReturnFoo() { return 'foo'; }
const awaitFoo = asyncReturnFoo();
awaitFoo.then(result => console.log(result));
// async function asyncThrow() {throw new Error('エラー')}
// asyncThrow();
async function pauseAndResume(pausePeriod) {
    console.log('pauseAndResume開始');
    await new Promise(resolve => setTimeout(resolve, pausePeriod));
    console.log('pauseAndResume再開');
}
pauseAndResume(1000);
console.log('asnyc関数外の処理はawaitの影響を受けない');
const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        // asyncイテレータ
        return {
            next() {
                if (i > 3) {
                    return Promise.resolve({ done: true });
                }
                return new Promise(resolve => setTimeout(() => resolve({ value: i++, done: false }), 100));
            }
        };
    }
};
try {
    for (var _d = true, asyncIterable_1 = __asyncValues(asyncIterable), asyncIterable_1_1; asyncIterable_1_1 = await asyncIterable_1.next(), _a = asyncIterable_1_1.done, !_a; _d = true) {
        _c = asyncIterable_1_1.value;
        _d = false;
        const element = _c;
        console.log(element);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = asyncIterable_1.return)) await _b.call(asyncIterable_1);
    }
    finally { if (e_1) throw e_1.error; }
}
;
export {};
