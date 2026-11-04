import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();

  // ① 記事・エラー・通信状態を管理
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // ② IDに対応する記事をAPIから取得
  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setIsLoading(true);
      setError("");
      setPost(null);

      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("記事を取得できませんでした");
        }

        const data = await res.json();

        // APIのレスポンス形式に合わせて記事を取り出す
        setPost(data.post ?? data);
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

    fetchPost();

    return () => controller.abort();
  }, [id]);

  // ③ 通信中
  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  // ④ エラー発生時
  if (error) {
    return <p role="alert">エラー：{error}</p>;
  }

  // ⑤ 記事が見つからない場合
  if (!post) {
    return <p>記事が見つかりません。</p>;
  }

  // ⑥ 記事データを取り出す
  const {
    title,
    thumbnailUrl,
    createdAt,
    categories,
    content,
  } = post;

  // ⑦ 記事詳細を表示
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full mt-6"
      />

      <p className="mt-6 text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString("ja-JP")}
      </p>

      <div className="flex gap-2 mt-2">
        {categories?.map((category, index) => (
          <span key={index}>{category}</span>
        ))}
      </div>

      <h1 className="text-2xl font-bold my-4">
        {title}
      </h1>

      <div
        className="text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Link to="/" className="text-blue-600">
        記事一覧へ戻る
      </Link>
    </div>
  );
}