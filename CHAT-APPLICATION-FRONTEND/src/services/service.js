import axios from "axios";

const Service = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 1000,
  validateStatus: function (status) {
    return true;
  },
});

export default Service;
