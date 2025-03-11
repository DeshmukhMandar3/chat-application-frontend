import React from "react";

const ChatCard = ({
  title = "",
  isGroup = false,
  avatar = "",
  message = {
    text: "How are you?",
    timestamp: "Today, 9.52pm",
  },
  onPress,
}) => {
  avatar = avatar || isGroup ? "./groupChat.png" : "./dm.png";
  return (
    <div className="chatCard-wrapper" onClick={onPress}>
      <div className="chatCard-left">
        <img src={avatar} alt="avatar" className="chatCard-avatar" />
        <div>
          <div className="chatCard-name">{title}</div>
          <div className="chatCard-message">{message?.text}</div>
        </div>
      </div>
      <div className="chatCard-message">{message?.timestamp}</div>
    </div>
  );
};

export default ChatCard;
