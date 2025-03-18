const ChattingLoader = ({ username }) => {
  return (
    <div className="chat-bubble">
      {username && <div className="message-content-sender">{username}</div>}
      <div className="typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default ChattingLoader;
