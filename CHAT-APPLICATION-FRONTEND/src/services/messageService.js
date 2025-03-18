import Service from "./service";

const MessageService = {
  getAllMessages: (body) => {
    return Service.post("/messages/get", body, {
      headers: { Authorization: localStorage.getItem("sessionToken") },
    });
  },
};

export default MessageService;
