import axios from "axios";
import { App } from "../Constant";
import { storage } from "../hooks/storage";

export const httpClient = axios.create({
  baseURL: App.api.baseUrl,
});

httpClient.interceptors.request.use(
  async (config) => {
    let token = storage.get("user.token");
    console.log("token", token);
    if (token) {
      config.headers = new axios.AxiosHeaders({
        ...config.headers,
        Authorization: `Bearer ${token}`,
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);
