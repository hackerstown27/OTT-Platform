import axios from "axios";
import config from "../env";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export default instance;
