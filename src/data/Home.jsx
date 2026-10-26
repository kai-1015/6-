import PostsDetail from "../components/PostsDetail.jsx";
import { posts } from './posts.js';

//記事一覧（ホーム画面）
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1> 

      {/* 記事一覧のmapを使用した一覧データの繰り返し表示 */}
      <div className="gap-4">
        {posts.map((post) => (
          <PostsDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
      
