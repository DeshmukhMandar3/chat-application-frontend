import Service from "./service";

const ChatService = {
  getAllChats: (body) => {
    return Service.post("/chats/userChats", body, {
      headers: { Authorization: localStorage?.getItem("sessionToken") },
    });
  },
};

export default ChatService;
