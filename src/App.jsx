import Header from "./components/SiteHeader.jsx";
import PostsDetail from "./components/PostsDetail.jsx";
import { posts } from "./data/posts.js";

function App() {
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8"> 
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
       {posts.map((post) => (
        <PostsDetail key={post.id} post={post} />
      ))}
      </div>
    </div>
  );
}

export default App;