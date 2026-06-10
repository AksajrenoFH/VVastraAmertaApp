import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://10.34.183.163:8000/api";

// ngubah api jadi format json, dan kalo server gk respons selama 1.5 detik abakal dibatalin
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});

// klo user dah login, otomatis kesimpen di memori hp sama asyncstorage
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
