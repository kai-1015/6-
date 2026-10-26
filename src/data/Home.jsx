import PostDetails from '../components/PostDetails.jsx';
import { posts } from './posts.js';

//記事一覧（ホーム画面）
export default function Home() {
  return (
    <div>      
//記事一覧のmapを使用した一覧データの繰り返し表示
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
      
