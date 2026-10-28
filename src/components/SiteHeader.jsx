//ヘッダー部分のコンポーネント
export default function Header() {
  return (
    <header className=" px-6 py-4 bg-zinc-800 text-white ">
      <nav className="flex justify-between items-center space-x-4">
        <a href="/" className="hover:bg-gray-950 font-bold">Blog</a>
        <a href="/contact" className="hover:bg-gray-950 font-bold">お問い合わせ</a>
      </nav>    
    </header>
  )
}

