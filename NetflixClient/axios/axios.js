import axios from "axios";
import config from "../env";

const instance = axios.create({
  baseURL: config.SERVER_URL,
});

export default instance;
