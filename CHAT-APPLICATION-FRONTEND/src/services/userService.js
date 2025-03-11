import Service from "./service";

const UserService = {
  getAllUsers: (body) => {
    return Service.post("/user/getAll", body, {
      headers: { Authorization: localStorage?.getItem("sessionToken") },
    });
  },
};

export default UserService;
