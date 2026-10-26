//main.jsx = Reactアプリを実行する際に最初に呼び出されるファイル(エントリーポイント)

//React関連のライブラリをインポート
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
