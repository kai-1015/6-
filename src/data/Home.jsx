import { useEffect, useState } from "react";
import PostsDetail from "../components/PostsDetail.jsx";

export default function Home() {
  // 記事一覧・エラー・読み込み状態を管理
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetcher = async () => {
      try {
        const res = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts",
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("記事を取得できませんでした");
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (e) {
        if (controller.signal.aborted) return;

        setError(
          e instanceof Error ? e.message : "通信に失敗しました"
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetcher();

    return () => controller.abort();
  }, []);

  // 通信中の表示
  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  // エラーが発生した場合
  if (error) {
    return <p role="alert">エラー：{error}</p>;
  }

  // 記事が0件の場合
  if (posts.length === 0) {
    return <p>記事がありません。</p>;
  }

  // 正常に取得できた場合
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>

      <div>
        {posts.map((post) => (
          <PostsDetail
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}