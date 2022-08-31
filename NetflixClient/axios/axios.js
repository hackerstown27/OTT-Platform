import axios from "axios";
import config from "../env";

const instance = axios.create({
  baseURL: "http://192.168.1.7:3000/",
});

export default instance;
