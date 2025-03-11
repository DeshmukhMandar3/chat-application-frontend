import Service from "./service";

const AuthService = {
  registerNewUser: (body) => {
    return Service.post("/auth/register", body);
  },

  login: (body) => {
    return Service.post("/auth/login", body);
  },
};

export default AuthService;
