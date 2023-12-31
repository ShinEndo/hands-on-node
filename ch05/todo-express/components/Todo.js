// 5　HTTPサーバとHTTPクライアント
// *************************************************
// 5.5 ユニバーサルWebアプリケーション
// *************************************************
// 外部のモジュールで公開されたものを利用するためのimport文
import 'isomorphic-fetch';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 各ページに関する情報の定義
const pages = {
	index: { title: 'すべてのTodo', fetchQuery: '' },
	active: { title: '未完了のTodo', fetchQuery: '?completed=false' },
	completed: { title: '完了したTodo', fetchQuery: 'completed=true' },
};

// CSRでページを切り替えるためのリンク
const pageLinks = Object.keys(pages).map((page, index) => (
	<Link
		href={`/${page === 'index' ? '' : page}`}
		key={index}
		style={{ marginRight: 10 }}
	>
		{pages[page].title}
	</Link>
));

// Reactコンポーネントを実装し、外部のモジュールで利用可能なようにexport文で公開
export default function Todos(props) {
	const { title, fetchQuery } = pages[props.page];

	// コンポーネントの状態の初期化と、propsの値に応じた更新
	const [todos, setTodos] = useState([]);

	

	useEffect(() => {
		fetch(`/api/todos${fetchQuery}`).then(async (res) =>
			res.ok ? setTodos(await res.json()) : alert(await res.text())
		);
	}, [props.page]);

	// このコンポーネントが描画するUIをJSX構文で記述して返す
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<style>{`body{display:block !important;}`}</style>
			</Head>
			
			<h1>{title}</h1>
			{/* Todo一覧の表示 */}
			<ul>
				{todos.map(({ id, title, completed }) => (
					<li key={id}>
						<span
							style={
								completed
									? { textDecoration: 'line-through' }
									: {}
							}
						>
							{title}
						</span>
					</li>
				))}
			</ul>
			<div>{pageLinks}</div>
		</>
	);
}
