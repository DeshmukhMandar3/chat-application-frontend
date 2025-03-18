import { io } from "socket.io-client";
const token = localStorage.getItem("sessionToken");

export const socket = io("http://localhost:8080", {
  auth: { token },
  reconnection: true,
  reconnectionAttempts: 3,
  transports: ["websocket", "polling"],
  withCredentials: true,
});
