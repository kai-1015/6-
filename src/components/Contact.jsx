import { useState, useRef } from "react";

export default function Contact() {
    // 入力された値の管理
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // エラーメッセージの管理
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [messageError, setMessageError] = useState("");

    // 送信中の状態を管理する状態
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // メールアドレスの参照を取得するためのref
    const emailRef = useRef(null);

    // エラーメッセージを設定する処理
    const validateName = () => {
        if (name.trim() === "") {
            setNameError("お名前は必須です。");
            return false;
        } else if (name.length > 30) {
            setNameError("名前は30文字以内で入力してください");
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const validateEmail = () => {
        if (email.trim() === "") {
            setEmailError("メールアドレスは必須です。");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validateMessage = () => {
        if (message.trim() === "") {
            setMessageError("本文は必須です。");
            return false;
        } else if (message.length > 500) {
            setMessageError("本文は500文字以内で入力してください。");
            return false;
        } else {
            setMessageError("");
            return true;
        }
    };

    // フォーム送信時の処理
    const handleSubmit = async (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // メールアドレスが入力されている場合だけ形式をチェック
        let isEmailFormatValid = true;

        if (email.trim() !== "") {
          isEmailFormatValid = emailRef.current?.reportValidity() ?? false;
        }

        // どれか1つでもバリデーションエラーがある場合は送信処理を中断する
        if (
          !isNameValid ||
          !isEmailValid || 
          !isMessageValid ||
          !isEmailFormatValid 
        ) {  
          return;
        }

        const body = {
            name: name,
            email: email,
            message: message
        };

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch(
                "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                throw new Error("送信に失敗しました");
            }

            alert("送信しました。");
            // 送信後にフォームをクリアする
            handleClear();

        } catch (error) {
            setSubmitError("送信中にエラーが発生しました。もう一度お試しください。");

        } finally {
            setIsSubmitting(false);
        }
    };


    // クリアボタンを押したときに入力欄とエラーメッセージをリセットする処理
    const handleClear = () => {
        setName("");
        setEmail("");
        setMessage("");

        setNameError("");
        setEmailError("");
        setMessageError("");

        setSubmitError("");
    };

    return (
        <main className="max-w-5xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold mb-4">
                問い合わせフォーム
            </h1>

            <form onSubmit={handleSubmit} noValidate>
                {/* 名前記入欄 */}
                <div className="flex items-start gap-6 mb-6">
                    <label htmlFor="name" className="w-48 shrink-0 pt-3">
                        お名前
                    </label>

                    <div className="flex-1">
                        <input type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            disabled={isSubmitting}
                            className="w-full border border-gray-300 rounded-md p-3"
                        />
                        {nameError && (
                            <p className="text-red-500">
                                {nameError}
                            </p>
                        )}
                    </div>
                </div>

                {/* メールアドレス入力欄 */}
                <div className="flex items-start gap-6 mb-6">
                    <label htmlFor="email" className="w-48 shrink-0 pt-3">
                        メールアドレス
                    </label>

                    <div className="flex-1 min-w-0">
                        <input
                            ref={emailRef}
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={isSubmitting}
                            className="w-full border border-gray-300 rounded-md p-3"
                        />
                        {emailError && (
                            <p className="text-red-500">
                                {emailError}
                            </p>
                        )}
                    </div>
                </div>

                {/* 本文入力欄 */}
                <div className="flex items-center gap-6 mb-6">
                    <label htmlFor="message" className="w-48 shrink-0">
                        本文
                    </label>

                    <div className="flex-1 min-w-0">
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full border border-gray-300 rounded-md p-3 h-48"
                        />
                        {messageError && <p className="text-red-500">{messageError}</p>}
                    </div>
                </div>

                {/* 送信、クリアボタン */}
                <div className="flex justify-center gap-4 mt-10">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gray-700 text-white font-bold px-6 py-3 rounded-md disabled:opacity-50"
                    >
                        {isSubmitting ? "送信中..." : "送信"}
                    </button>

                    <button type="button"
                        onClick={handleClear}
                        disabled={isSubmitting}
                        className="bg-gray-200 text-black px-6 py-3 rounded-md disabled:opacity-50"
                    >
                        クリア
                    </button>
                </div>

                {submitError && (
                    <p className="text-red-500" role="alert">
                        {submitError}
                    </p>
                )}

            </form>
        </main>
    )
}