# 独自チケットデータ分析用アプリ
## フロントエンド
- Next.jsによるフロントエンド開発
- フロント側の認証としてAuth.jsを使用
- actions内のticket,userでそれぞれ認証情報とチケット情報のやり取りを行う
  - チケット情報は認証情報がないとデータ取得できないので、認証情報を送信
- shadcn/uiで提供されている各種コンポーネントを利用。一部変更を加えることで独自コンポーネントを作成
- rechart.jsを利用した、グラフ描画用コンポーネントを実装
## バックエンド
- DRFで構築。APIを叩くことで認証とチケットデータの取得が可能。
- 権限ユーザによってデータ管理、CSVからデータの加工、CSVからDBへのアップロードが可能
- データ加工はpandasを用いた独自の処理を実装
- 認証はdjoserでJWTによる方式を採用
- メールによるアカウント登録を採用
- 本番環境として、AWSインスタンスに環境を構築し、Gunicorn,Nginxでサーバを立てる
- DBにPostgreSQL
