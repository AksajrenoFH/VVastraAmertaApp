import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  // ngirim data login
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/login", {
      email,
      password,
    });

    // nimpen ke memori hp
    await AsyncStorage.setItem("auth_token", data.token);
    await AsyncStorage.setItem("auth_user", JSON.stringify(data.user));
    return data;
  },

  // ngapus token yang udh di simpen di memorihp
  async logout(): Promise<void> {
    await apiClient.post("/logout");
    await AsyncStorage.removeItem("auth_token");
    await AsyncStorage.removeItem("auth_user");
  },

  /**
   * ngambil token
   * ngambil data user
   * ngecek login statusnya aktif apa ndak
   */
  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem("auth_token");
  },

  async getUser(): Promise<User | null> {
    const raw = await AsyncStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  },

  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem("auth_token");
    return !!token;
  },
};
