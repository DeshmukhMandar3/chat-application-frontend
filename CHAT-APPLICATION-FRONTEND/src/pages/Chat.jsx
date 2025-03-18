import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { getChatAvatar, getChatTitle, routes } from "../utils/constants";
import { toast } from "react-toastify";
import MessageService from "../services/messageService";
import Message from "../components/Message";
import { socket } from "../socket/socket";
import ChattingLoader from "../components/ChattingLoader";

const Chat = () => {
  const { chat } = useSelector((state) => state.common);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [typedMessage, setTypedMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState();

  useEffect(() => {
    if (!chat?._id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!chat?._id) return;

    socket.emit("joinRoom", chat?._id);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("userTyping", (user) => {
      setTypingUser(user);
    });

    socket.on("userStoppedTyping", (user) => {
      setTypingUser();
    });

    return () => {
      socket.emit("leaveRoom", chat?._id);
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [chat?._id]);

  const fetchAllMessages = async () => {
    try {
      const response = await MessageService.getAllMessages({
        chatId: chat._id,
      });
      if (response.status === 200) {
        if (response?.data?.messages) {
          setMessages((prev) => [...prev, ...response?.data?.messages]);
        }
      } else if (response?.status === 401) {
        console.error(response);
        toast.error(response?.data?.error || "Session token expired!");
        localStorage.removeItem("sessionToken", { position: "bottom-center" });
        setTimeout(() => {
          navigate(routes.AUTH);
        }, 5000);
      } else {
        console.error(response);
        toast.error(response?.data?.error || "Something Went Wrong!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error Occured!");
      navigate("/");
    }
  };

  const handleSendClick = () => {
    if (typedMessage?.trim().length === 0) return;
    socket.emit("sendMessage", { chatId: chat?._id, message: typedMessage });
    setTypedMessage("");
  };

  const handleKeyPress = () => {
    socket.emit("typing", chat?._id);
    setTimeout(() => {
      socket.emit("stopTyping", chat?._id);
    }, 2000);
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, typingUser]);

  return (
    <div className="chatscreen-wrapper" ref={messagesEndRef}>
      <div className="chatscreen-navbar-container">
        <Navbar
          isGroupChat={chat?.isGroup}
          isDirectMessage={!chat?.isGroup}
          avatar={getChatAvatar(chat)}
          s
          title={getChatTitle(chat)}
        />
      </div>
      <div className="chatscreen-messages-wrapper">
        {messages?.map((message) => (
          <Message isGroup={chat?.isGroup} message={message} />
        ))}
        {typingUser?._id && <ChattingLoader username={typingUser?.username} />}
      </div>

      <div className="chatscreen-input-cta-wrapper">
        <input
          placeholder="Type your message here..."
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div onClick={handleSendClick}>Send</div>
      </div>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Chat;
