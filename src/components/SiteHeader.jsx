import { Link } from "react-router-dom";

//ヘッダー部分のコンポーネント
export default function Header() {
  return (
    <header className=" px-6 py-4 bg-zinc-800 text-white ">
      <nav className="flex justify-between items-center space-x-4">
        <Link to="/" className="hover:bg-gray-950 font-bold">Blog</Link>
        <Link to="/contact" className="hover:bg-gray-950 font-bold">お問い合わせ</Link>
      </nav>    
    </header>
  )
}

