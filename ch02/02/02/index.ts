// 2.2.2　エラーハンドリング
// *************************************************
function parseJSONSync(json: string) {
	try {
		return JSON.parse(json);
	} catch (err) {
		console.error('エラーをキャッチ', err);
	}
}
// エラーになる
parseJSONSync('不正なJSON');

// 正常に通過する
const checkJSON = parseJSONSync('{"message":"Hello","to":"World"}');
console.log(checkJSON);

// ********************
// try catchではコールバックの中で発生した、エラーをハンドリングできない
// ********************
function parseJSONAsync(json: string, callback: ({}) => void) {
	try {
		setTimeout(() => {
			callback(JSON.parse(json));
		}, 1000);
	} catch (err) {
		console.log('エラーをキャッチ', err);
		callback({});
	}
}
// エラーをキャッチできず、クラッシュする
//parseJSONAsync('不正なJSON', (result) => console.log('parse結果', result));
parseJSONAsync('{"message":"Hello","to":"World"}', (result) =>
	console.log('parse結果', result)
);

function parseJSONAsync2(
	json: string,
	callback: (err: unknown, result?: any) => void
) {
	setTimeout(() => {
		try {
			callback(null, JSON.parse(json));
		} catch (err: unknown) {
			callback(err);
		}
	}, 1000);
}
parseJSONAsync2('不正なJSON', (err, result) =>
	console.log('parse結果', err, result)
);
parseJSONAsync2('{"message":"Hello","to":"World"}', (err, result) =>
	console.log('parse結果', err, result)
);
