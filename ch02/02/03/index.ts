// 2.2.3　混ぜるな危険、同期と非同期
// *************************************************
function parseJSONAsync(
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

const cache2 = {};

function parseJSONAsyncWithCache(json: string, callback: any) {
	const cached = cache2[json];

	if (cached) {
		// キャッシュに値が存在する場合でも、非同期的にコールバックを実行する
		setTimeout(() => callback(cached.err, cached.result), 0);
		return;
	}

	parseJSONAsync(json, (err, result) => {
		cache2[json] = { err, result };
		callback(err, result);
	});
}

parseJSONAsyncWithCache('{"message":"Hello","to":"World"}', (err, result) => {
	console.log('1回目の結果', err, result);

	parseJSONAsyncWithCache(
		'{"message":"Hello","to":"World"}',
		(err, result) => {
			console.log('2回目の結果', err, result);
		}
	);
	console.log('2回目の呼び出し完了');
});
console.log('1回目の呼び出し完了');
