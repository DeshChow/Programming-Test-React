import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://api.spacexdata.com",
  withCredentials: false,
  "Content-Type": "application/json",
});
export default axiosInstance;
