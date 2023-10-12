import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import io from 'socket.io-client';

// 各ページに関する情報の定義
const pages = {
	index: { title: 'すべてのToDo' },
	active: { title: '未完了のToDo', completed: false },
	completed: { title: '完了したToDo', completed: true },
};

export default function Todos(props) {
	const [title, completed] = pages[props.page];
	const [todos, setTodos] = useState([]);

	// socketをstateとして保持
	const [socket, setSocket] = useState();

	useEffect(() => {
		// socketを生成
		const socket = io('/todos');
		socket.on('todos', (todos) => {
			setTodos(
				typeof completed === 'undefined'
					? todos
					: todos.filter((todo) => todo.completed === completed)
			);
		});
		setSocket(socket);
		// コンポーネントのクリーンアップ時にSocketをクローズ
		return () => socket.close();
	}, [props.page]);

	// JSX
	return <>{/* ・・・ */}</>;
}
