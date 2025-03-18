export const routes = Object.freeze({
  AUTH: "/auth",
  CHAT: "/chat",
  ALL_CHATS: "/",
});

export const getChatAvatar = (chat) => {
  if (chat?.isGroup) {
    return chat?.avatar;
  }
  const userId = localStorage.getItem("userId");
  return chat?.members?.find((member) => member?._id !== userId)?.avatar;
};

export const getChatTitle = (chat) => {
  if (chat?.isGroup) {
    return chat?.name;
  }
  const userId = localStorage.getItem("userId");
  return chat?.members?.find((member) => member?._id !== userId)?.username;
};
