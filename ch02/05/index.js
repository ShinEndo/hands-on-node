var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function asyncFunc(json) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield parseJSONAsync(json);
            console.log('パース結果', result);
        }
        catch (err) {
            console.log('エラーをキャッチ', err);
        }
    });
}
// 正常系
asyncFunc('{"foo":1}');
// 異常系
asyncFunc('不正なJSON');
function asyncReturnFoo() {
    return __awaiter(this, void 0, void 0, function* () { return 'foo'; });
}
const awaitFoo = asyncReturnFoo();
awaitFoo.then(result => console.log(result));
// async function asyncThrow() {throw new Error('エラー')}
// asyncThrow();
function pauseAndResume(pausePeriod) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('pauseAndResume開始');
        yield new Promise(resolve => setTimeout(resolve, pausePeriod));
        console.log('pauseAndResume再開');
    });
}
pauseAndResume(1000);
console.log('asnyc関数外の処理はawaitの影響を受けない');
// 2.5.2　async/await構文のメリット
// *************************************************
// 2.5.3　async/await構文と非同期処理の並行実行
// *************************************************
// 2.5.4　トップレベルawait
// *************************************************
