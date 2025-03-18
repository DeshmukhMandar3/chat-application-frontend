import dayjs from "dayjs";

const Message = ({ isGroup, message }) => {
  const userId = localStorage.getItem("userId");
  const isSlef = message?.senderId?._id === userId;

  return (
    <div className={`message-wrapper ${isSlef ? "message-wrapper-self" : ""}`}>
      <div className="message-content">
        {isGroup && (
          <div className="message-content-sender">
            {message?.senderId?.username}
          </div>
        )}
        <div>
          <div>{message?.content}</div>
          <div className="message-content-date">
            {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
