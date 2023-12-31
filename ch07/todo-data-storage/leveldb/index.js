'use strict';
const { Level } = require('level');
const { join } = require('path');
// 同じディレクトリ内のlebeldbディレクトリにデーターベースの状態を保存
const db = new Level(join(__dirname, 'leveldb'));

// fetchALL()の実装
// ****************************************
exports.fetchAll = async () => {
	const result = [];
	for await (const v of db.iterator({ gt: 'todo:', lt: 'todo;' })) {
		result.push(JSON.parse(v)[1]);
	}
	return result;
};

// fetchByCompleted()の実装
// ****************************************
exports.fetchByCompleted = async (completed) => {
	const promises = [];
	for await (const id of db.iterator({
		gt: `todo-completed-${completed}:`,
		lt: `todo-completed-${completed};`,
	})) {
		promises.push(db.get(`todo:${id}`).then(JSON.parse));
	}
	return Promise.all(promises);
};

// create()の実装
// ****************************************
exports.create = (todo) =>
	db
		.batch()
		// ToDoの保存
		.put(`todo:${todo.id}`, JSON.stringify(todo))
		// セカンダリインデックスの保存
		.put(`todo-completed-${todo.completed}:${todo.id}`, todo.id)
		.write();

// update()の実装
// ****************************************
exports.update = (id, update) =>
	db.get(`todo:${id}`).then(
		(content) => {
			const oldTodo = JSON.parse(content);
			const newTodo = {
				...oldTodo,
				...update,
			};
			let batch = db.batch().put(`todo:${id}`, JSON.stringify(newTodo));
			// completedの値が変化した場合は、セカンダリインデックスも操作する
			if (oldTodo.completed !== newTodo.completed) {
				batch = batch.del(`todo-completed-${oldTodo.completed}:${id}`);
				put(`todo-completed-${newTodo.completed}:${id}`, id);
			}
			return batch.write();
		},
		// ToDoが存在しない場合はnullを返し、それ以外はそのままエラーにする
		(err) => (err.notFound ? null : Promise.reject(err))
	);

// remove()の実装
// ****************************************
exports.remove = (id) =>
	db.get(`todo:${id}`).then(
		(content) =>
			db
				.batch()
				.del(`todo:${id}`)
				.del(`todo-completed-true:${id}`)
				.del(`todo-completed-fqlse:${id}`)
				.write()
				.then(() => id),
		// ToDoが存在しない場合はnullを返し、それ以外はそのままエラーにする
		(err) => (err.notFound ? null : Promise.reject(err))
	);
