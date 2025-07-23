import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const CommentForm = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [comment, setComment] = useState("");

  const onEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 relative">
      <form className="flex items-center gap-2 bg-white rounded-lg p-3">
        <input
          type="text"
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-grow px-2 py-2 border-b border-gray-300 focus:border-black focus:outline-none transition duration-200 text-sm sm:text-base bg-transparent"
        />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPicker((prev) => !prev)}
            className="text-2xl sm:text-3xl hover:scale-110 transition-transform"
          >
            😀
          </button>

          {showPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker
                height={350}
                width={300}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
