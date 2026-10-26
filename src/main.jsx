//main.jsx = Reactアプリを実行する際に最初に呼び出されるファイル(エントリーポイント)

//React関連のライブラリをインポート
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


//index.htmlの<div id="root"></div>にReactアプリを描画（表示）する
//APPコンポーネントを実行し、その結果を「id="root"」である要素に描画しなさい
createRoot(document.getElementById('root')).render(
//StrictModeはReactの開発モードで「べからず」なコードに対して警告を出してくれる機能
　<StrictMode>
    <App />
  </StrictMode>,
)
