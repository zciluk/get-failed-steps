import axios from "axios";

export default axios.create({
  baseURL: "https://gitlab.com/api/v4//"
});
