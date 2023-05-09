import React, { useState } from "react";
import Form from "./Form";
import EmojiPicker from "emoji-picker-react";
import classNames from "classnames";

const Footer = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <footer
      className={classNames({
        "w-full pb-2 shadow-zinc-200 relative    min-h-[30px] px-5  h-auto py-1 shadow-md": true,
      })}
    >
      <Form
        setShowEmojiPicker={setShowEmojiPicker}
        showEmojiPicker={showEmojiPicker}
      />
    </footer>
  );
};

export default Footer;
