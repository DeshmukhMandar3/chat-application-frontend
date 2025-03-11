import React from "react";
import { Route, Routes } from "react-router-dom";
import AllChats from "../pages/AllChats";
import Auth from "../pages/Auth";
import Chat from "../pages/Chat";
import PrivateRoutes from "./PrivateRoutes";
import { routes } from "../utils/constants";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={routes.AUTH} element={<Auth />} />
      <Route
        path={routes.ALL_CHATS}
        element={
          <PrivateRoutes>
            <AllChats />
          </PrivateRoutes>
        }
      />
      <Route
        path={routes.CHAT}
        element={
          <PrivateRoutes>
            <Chat />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
