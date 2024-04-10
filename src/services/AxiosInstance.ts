import axios from "axios";

const axiosApiCaller = axios.create();

axiosApiCaller.defaults.baseURL = "http://localhost:4000/v1/api";

// Request interceptor for API calls
axiosApiCaller.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] =
      `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : ""}`;
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["x-tz"] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosApiCaller;
