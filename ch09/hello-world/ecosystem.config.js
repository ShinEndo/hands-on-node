module.exports = {
	apps: [
		{
			// PM2で管理されるアプリケーション名
			name: 'APP',
			// 実行されるスクリプト
			script: 'app.js',
			// スクリプトに渡される引数
			args: 'one two',
			// インスタンス数
			instances: 0,
			// アプリケーション実行時の環境変数
			env: {
				NODE_ENV: 'development',
			},
			// "--env production"オプション付きでアプリケーション起動時の環境変数
			env_production: {
				NODE_ENV: 'production',
			},
			watch: '.',
		},
		{
			script: './service-worker/',
			watch: ['./service-worker'],
		},
	],

	deploy: {
		production: {
			// デプロイに使用するSSHユーザー名
			user: 'SSH_USERNAME',
			// デプロイ先ホスト（配列で複数のホストを指定することも可能）
			host: 'SSH_HOSTMACHINE',
			// デプロイ対象のGitブランチ
			ref: 'origin/master',
			// デプロイ対象のGitリポジトリ
			repo: 'GIT_REPOSITORY',
			// ソースコードをgit cloneするデプロイ先ホストのパス
			path: 'DESTINATION_PATH',
			// デプロイ後にデプロイ先で実行するコマンド
			'pre-deploy-local': '',
			'post-deploy':
				'npm install && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
			// その他の環境へデプロイの設定
		},
	},
};
