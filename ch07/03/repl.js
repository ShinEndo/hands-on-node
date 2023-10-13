const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const dbRun = util.promisify(db.run.bind(db));

await dbRun(
	`CREATE TABLE todo (id TEXT PRIMARY KEY, title TEXT NOT NULL, completed BOOLEAN NOT NULL)`
);

await dbRun(`INSERT INTO todo VALUES ('1','ネーム',false)`);

await dbRun(`INSERT INTO todo VALUES ('1','下書き',false)`);

const statement = db.prepare(`INSERT INTO todo VALUES (?,?,?)`);

await util.promisify(statement.run.bind(statement))('2', '下書き', false);

await dbRun(`INSERT INTO todo VALUES (?,?,?)`, '3', 'ペン入れ', false);

await dbRun(`INSERT INTO todo VALUES (?,?,?)`, ['4', '仕上げ', false]);

await dbRun(`INSERT INTO todo VALUES ($id,$title,$completed)`, {
	$id: '5',
	$title: '出稿',
	$completed: false,
});

const dbAll = util.promisify(db.all.bind(db));

await dbAll(`SELECT * FROM todo`);

await dbAll(`SELECT id, title FROM todo`);

await dbAll(`SELECT title FROM todo`);

await dbAll(`SELECT * FROM todo WHERE id = '2'`);

const dbGet = util.promisify(db.get.bind(db));

await dbGet(`SELECT * FROM todo WHERE id = ?`, '3');

await dbRun(`UPDATE todo SET completed = true`);

await dbAll(`SELECT * FROM todo`);

await dbRun(`UPDATE todo SET completed = ? WHERE id = ?`, false, 4);

await dbAll(`SELECT * FROM todo`);

await dbRun(`UPDATE todo SET completed = ? WHERE id = ?`, false, '100');

db.run(`UPDATE todo SET completed = ? WHERE id = ?`, false, '100', function () {
	console.log(this);
});

const dbRun2 = function () {
	return new Promise((resolve, reject) =>
		db.run.apply(db, [
			...arguments,
			function (err) {
				err ? reject(err) : resolve(this);
			},
		])
	);
};

function add(a, b) {
	return (Number(this) || 0) + a + b;
}

add.apply(1, [2, 3]);

await dbRun2(`UPDATE todo SET completed = ? WHERE id = ?`, false, '100');

await dbRun2(`DELETE FROM todo WHERE id = ?`, '1');

await dbAll(`SELECT * FROM todo`);

await dbRun2(`DELETE FROM todo`);

await dbAll(`SELECT * FROM todo`);

async function createTodos(todos) {
	await dbRun(`BEGIN TRANSACTION`);
	try {
		for (const todo of todos) {
			await dbRun(
				`INSERT INTO todo VALUES (?,?,?)`,
				todo.id,
				todo.title,
				todo.completed
			);
		}
	} catch (err) {
		console.error(err);
		return dbRun(`ROLLBACK TRANSACTION`);
	}
	return dbRun(`COMMIT TRANSACTION`);
}

await createTodos([
	{ id: '1', title: 'ネーム', completed: false },
	{ id: '2', title: '下書き', completed: true },
]);

await dbAll(`SELECT * FROM todo`);

await createTodos([
	{ id: '3', title: 'ペン入れ', completed: false },
	{ id: '4', title: null, completed: false },
	{ id: '5', title: '出稿', completed: false },
]);
