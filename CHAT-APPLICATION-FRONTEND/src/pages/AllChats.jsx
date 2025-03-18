import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChatService from "../services/ChatService";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/constants";
import { toast } from "react-toastify";
import ChatCard from "../components/ChatCard";
import { useDispatch } from "react-redux";
import { setChat } from "../redux/slice/commonSlice";

const AllChats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [directMessages, setDirectMessages] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedDms, setSearchedDms] = useState([]);
  const [searchedGroupChats, setSearchedGroupChats] = useState([]);
  const userId = localStorage.getItem("userId") || "";

  const handleChatClick = (chat) => {
    dispatch(setChat(chat));
    navigate("/chat");
  };

  const fetchAllChats = async () => {
    try {
      const response = await ChatService.getAllChats();
      if (response?.status === 200) {
        if (response?.data?.chats) {
          setDirectMessages(
            response?.data?.chats?.filter((chat) => !chat?.isGroup)
          );
          setGroupChats(response?.data?.chats?.filter((chat) => chat?.isGroup));
        }
      } else if (response?.status === 401) {
        toast.error(response?.data?.error || "Session token expired!");
        localStorage.removeItem("sessionToken", { position: "bottom-center" });
        setTimeout(() => {
          navigate(routes.AUTH);
        }, 5000);
      } else {
        console.log(response);
        toast.error(response?.data?.error || "Internal Error Occured");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error Occured");
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  useEffect(() => {
    const search = searchValue.trim().toLowerCase();
    if (search) {
      setSearchedDms(
        directMessages?.filter((dm) => {
          const user = dm?.members?.find((member) => member?._id !== userId);
          return user?.username?.toLowerCase()?.startsWith(search);
        })
      );
      setSearchedGroupChats(
        groupChats?.filter((chat) => {
          return chat?.name?.toLowerCase()?.startsWith(search);
        })
      );
    }
  }, [searchValue]);

  return (
    <div>
      <Navbar />
      <div className="allChats-content">
        <input
          placeholder="Search"
          className="allChats-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue.trim() ? (
          <div className="allChats-chat-widget">
            {Boolean(searchedDms?.length) ||
            Boolean(searchedGroupChats?.length) ? (
              <>
                {searchedGroupChats?.map((chat, index) => {
                  return (
                    <ChatCard
                      title={chat?.name}
                      avatar={chat?.avatar}
                      isGroup
                      onPress={() => handleChatClick(chat)}
                      key={index}
                    />
                  );
                })}
                {searchedDms?.map((chat, index) => {
                  const user = chat?.members?.find(
                    (member) => member?._id !== userId
                  );
                  return (
                    <ChatCard
                      title={user?.username}
                      avatar={user?.avatar}
                      onPress={() => handleChatClick(chat)}
                      key={index}
                    />
                  );
                })}
              </>
            ) : (
              <div style={{ color: "black" }}>No Chats Found</div>
            )}
          </div>
        ) : (
          <>
            {Boolean(groupChats?.length) && (
              <div className="allChats-chat-widget">
                <div className="allChats-chat-widget-title">Groups</div>
                <div>
                  {groupChats?.map((chat, index) => {
                    return (
                      <ChatCard
                        title={chat?.name}
                        avatar={chat?.avatar}
                        isGroup
                        onPress={() => handleChatClick(chat)}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {Boolean(directMessages?.length) && (
              <div className="allChats-chat-widget">
                <div className="allChats-chat-widget-title">People</div>
                <div>
                  {directMessages?.map((chat, index) => {
                    const user = chat?.members?.find(
                      (member) => member?._id !== userId
                    );
                    return (
                      <ChatCard
                        title={user?.username}
                        avatar={user?.avatar}
                        onPress={() => handleChatClick(chat)}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllChats;
