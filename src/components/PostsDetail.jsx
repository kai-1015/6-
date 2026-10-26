export default function PostsDetail({ post }) {
  const { title, thumbnailUrl, createdAt, categories, content } = post;

  return (
    <div className="flex flex-row gap-6 p-4 border-b border-gray-300">

      {/* 左側：サムネイル画像 */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-[30%]"
      />

      {/* 右側：記事情報全体 */}
      <div className="flex-1 min-w-0">

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
              className="bg-gray-200 text-gray-800 rounded-full px-3 "
            >
              {category}
            </span>
          ))}
        </div>

        {/* 記事タイトル */}
        <h2 className="text-xl font-bold mx-4">
          {title}
        </h2>

        {/* 記事本文 */}
         {/* 本文 */}
        <div dangerouslySetInnerHTML={{ __html: content }} 
        className="text-sm text-gray-700 line-clamp-2" />
        

      </div>
    </div>
  );
}