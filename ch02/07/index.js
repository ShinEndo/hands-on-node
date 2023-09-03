// 2.7　練習問題
// *************************************************
async function sumPromiseNumber(promiseArr) {
    const promiseResult = await Promise.allSettled(promiseArr);
    let sum = 0;
    for (const promise of promiseResult) {
        if (promise.status === 'fulfilled') {
            sum += promise.value;
        }
    }
    return sum;
}
const promise = new Promise((resolve) => { setTimeout(() => resolve(1), 1000); });
const promise2 = new Promise((resolve) => { setTimeout(() => resolve(2), 2000); });
const promise3 = Promise.resolve(3);
const promise4 = new Promise((resolve, reject) => { reject(new Error('エラー')); });
const promise5 = Promise.resolve(4);
const promise6 = Promise.reject(new Error('エラー'));
const promiseArr = [promise, promise2, promise3, promise4, promise5, promise6];
const result = sumPromiseNumber(promiseArr);
setTimeout(() => console.log(result), 5000);
export {};
