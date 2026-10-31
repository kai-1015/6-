import { useParams,Link } from "react-router-dom";
import { posts } from "../data/posts";

// ① URLからID(1or2or3)を取得 → ② find() で記事を特定 → ③ JSXで記事を表示
// useParamsフックを使ってURLパラメータを取得
export default function PostPage() {
  const { id } = useParams();

// findメソッドで記事情報のidが一致する記事を取得
  const post = posts.find(
  (post) => String(post.id) === id
  );

    if (!post) {
  return <p>記事が見つかりません。</p>;
  }

　const { title, thumbnailUrl, createdAt, categories, content } = post;


  return (
   <div className="max-w-4xl mx-auto px-4 py-8">

      {/* サムネイル画像 */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full"
      />

      {/*　記事情報全体 */}
      <div className="flex-1 min-w-0 mt-6 mb-4">

        {/* 日付とカテゴリー */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              timeZone: "Asia/Tokyo",
            })}
          </p>

          {categories.map((category) => (
            <span
              key={category}
              className="bg-gray-200 text-gray-800 rounded-full px-3">
              {category}
            </span>
          ))}
        </div>

        {/* 記事タイトル */}
        <h2 className="text-xl font-bold mx-2 my-4">
          {title}
        </h2>

        {/* 記事本文 */}
        <div dangerouslySetInnerHTML={{ __html: content }} 
        className="text-sm text-gray-700">
        </div>
        {/* 子要素がないので、閉じタグを省略しても良い。  
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-sm text-gray-700"
        />   */}

        {/* ホーム画面へ戻る */}
        <div className="font-bold text-blue-500 hover:underline mt-4">
          <Link to="/">記事一覧へ戻る</Link>
        </div>
      </div>
  </div>    
  );
}