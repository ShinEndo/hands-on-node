const { Level } = require('level');

const db = new Level('leveldb');

const todo1 = JSON.stringify({ id: '1', title: '表紙', completed: false });
const todo2 = JSON.stringify({ id: '2', title: 'ただの紙', completed: false });

await db.put('todo:1', todo1);
await db.put('todo:2', todo2);

await db.get('todo:1');
await db.get('todo:2');

_error.notFound;

for await (const data of db.iterator()) {
	console.log(data[0], data[1]);
}

await db.del('todo:1');
await db.get('todo:1');

await db.batch([
	{ type: 'put', key: 'city:2021', value: '東京' },
	{ type: 'put', key: 'city:2016', value: 'リオ' },
	{ type: 'put', key: 'city:2012', value: 'ロンドン' },
	{ type: 'del', key: 'city:2021' },
]);

for await (const data of db.iterator({ gt: 'city:', lt: 'city;' })) {
	console.log(data[0], data[1]);
}

await db
	.batch()
	.put('city:2008', '北京')
	.put('city:2004', 'アテネ')
	.put('city:2000', 'シドニー')
	.del('city:2016')
	.write();

await db.close();
