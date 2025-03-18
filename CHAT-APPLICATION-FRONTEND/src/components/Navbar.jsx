import React from "react";

const Navbar = ({
  isGroupChat = false,
  isDirectMessage = false,
  avatar,
  title,
}) => {
  return (
    <div className="navbar">
      {isGroupChat || isDirectMessage ? (
        <div className="navbar-chat-wrapper">
          <img
            src={avatar || isGroupChat ? "./groupChat.png" : "./dm.png"}
            className="chatCard-avatar"
          />
          {title && <div className="navbar-chat-text">{title}</div>}
        </div>
      ) : (
        "Banter"
      )}
    </div>
  );
};

export default Navbar;
