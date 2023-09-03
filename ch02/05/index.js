var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var _a, e_1, _b, _c, _d, e_2, _e, _f;
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
    for (var _g = true, asyncIterable_1 = __asyncValues(asyncIterable), asyncIterable_1_1; asyncIterable_1_1 = await asyncIterable_1.next(), _a = asyncIterable_1_1.done, !_a; _g = true) {
        _c = asyncIterable_1_1.value;
        _g = false;
        const element = _c;
        console.log(element);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_g && !_a && (_b = asyncIterable_1.return)) await _b.call(asyncIterable_1);
    }
    finally { if (e_1) throw e_1.error; }
}
;
function asyncGenerator() {
    return __asyncGenerator(this, arguments, function* asyncGenerator_1() {
        let i = 0;
        while (i <= 3) {
            yield __await(new Promise(resolve => setTimeout(resolve, 100)));
            yield yield __await(i++);
        }
    });
}
try {
    for (var _h = true, _j = __asyncValues(asyncGenerator()), _k; _k = await _j.next(), _d = _k.done, !_d; _h = true) {
        _f = _k.value;
        _h = false;
        const element = _f;
        console.log(element);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (!_h && !_d && (_e = _j.return)) await _e.call(_j);
    }
    finally { if (e_2) throw e_2.error; }
}
export {};
