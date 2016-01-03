# これまでに夫婦で行った都道府県

![開発中の画面キャプチャ](https://dl.dropboxusercontent.com/u/343/travel-memo.png)


## 開発

```
$ cd path/to/nakayoshi
$ bundle exec middleman server
```


## ビルド

```
$ npm run js:build
(= npm run js:lint && npm run js:browserify && npm run js:uglify)
$ bundle exec middleman build
```


## デプロイ

```
$ bundle exec middleman sync
```

環境変数 `GA_TRACKING_ID` , `AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を設定しておく必要がある


## Lint

* ESLint

```
$ npm run js:lint
```

* scss-lint

```
$ bundle exec scss-lint source/stylesheets/
```



## 今後やろうかと思ってること

* [Issues](https://github.com/kyokutyo/nakayoshi/issues)


## 使ってるもの

* [middleman/middleman](https://github.com/middleman/middleman)
* [Slim](http://slim-lang.com/)
* [yterajima/middleman-slim](https://github.com/yterajima/middleman-slim)
* [jquery/jquery](https://github.com/jquery/jquery)
* [jquery-color-utils](https://code.google.com/p/jquery-color-utils/)
* [Pure](http://purecss.io/)
* [yterajima/middleman-pure](https://github.com/yterajima/middleman-pure)
* [Google Fonts Nunito](http://www.google.com/fonts/specimen/Nunito)
* [Google Charts](https://developers.google.com/chart/?hl=ja)
* [Google Analytics](http://www.google.co.jp/intl/ja/analytics/)
* [MrJoy/middleman-google-analytics](https://github.com/MrJoy/middleman-google-analytics)
* [karlfreeman/middleman-sync](https://github.com/karlfreeman/middleman-sync)
* [S3](http://aws.amazon.com/jp/s3/)
* [Route53](http://aws.amazon.com/jp/route53/)
* [Babel](https://babeljs.io/)
