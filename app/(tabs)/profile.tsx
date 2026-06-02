import apiClient from "@/services/apiClient";
import { authService, User as UserType } from "@/services/authServices";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  FileText,
  LogOut,
  Mail,
  Shield,
  User,
  UserCheck,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasUnreadMsg, setHasUnreadMsg] = useState(false);

  const checkUnreadNotif = async () => {
    try {
      const res = await apiClient.get("/notification");
      const notif = res.data.notifications || [];
      const unread = notif.some(
        (item: any) => item.is_read == 0 || item.is_read == null,
      );
      setHasUnreadMsg(unread);
    } catch (e) {
      console.log(e);
    }
  };

  const loadUser = async () => {
    try {
      const u = await authService.getUser();
      setUser(u);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkUnreadNotif();
    }, []),
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([loadUser(), checkUnreadNotif()]);
    } catch (e) {
      console.log("Refresh failed:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      Toast.show({
        type: "success",
        text1: "Berhasil Keluar",
        text2: "Sampai jumpa lagi!",
        position: "top",
        visibilityTime: 3000,
      });
      router.replace("/(welcome)/login");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Gagal Keluar",
        text2: "Silakan coba lagi.",
        position: "top",
      });
      console.log(e);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <LinearGradient
      colors={["#FFE8BE", "#FFD4BF", "#F6CEAF"]}
      locations={[0, 0.54, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 110,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#F97316"]}
              tintColor="#F97316"
            />
          }
        >
          {/* Header */}
          <View
            style={{
              marginBottom: 24,
              borderColor: "#ffd485",
              borderBottomWidth: 2,
              paddingBottom: 12,
            }}
          >
            <Text
              style={{ fontSize: 26, fontWeight: "bold", color: "#1F2A44" }}
            >
              Profil Saya
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#555",
                marginTop: 2,
                fontWeight: "500",
              }}
            >
              Kelola akun dan pengaturan Anda
            </Text>
          </View>

          {/* User Info Card */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.8)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#F97316"
                style={{ padding: 20, flex: 1 }}
              />
            ) : (
              <>
                <View
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 34,
                    backgroundColor: "#FFEDD5",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#F97316",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#F97316",
                    }}
                  >
                    {getInitials(user?.name || "Pelanggan")}
                  </Text>
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#1F2A44",
                    }}
                  >
                    {user?.name || "Pelanggan"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    <Mail size={14} color="#6B7280" />
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        fontWeight: "500",
                      }}
                    >
                      {user?.email || "email@laundry.com"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      alignSelf: "flex-start",
                      backgroundColor: "#E6F4EA",
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 10,
                      marginTop: 8,
                    }}
                  >
                    <UserCheck size={12} color="#07694e" />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#07694e",
                        textTransform: "uppercase",
                      }}
                    >
                      {user?.role || "Pelanggan"}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>

          {/* Menu Sections */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.8)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 12,
                marginBottom: 8,
                paddingHorizontal: 8,
              }}
            >
              Pengaturan Akun
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 16,
              }}
              activeOpacity={0.7}
              onPress={() => router.push("/(profile)/edit")}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFEDD5",
                  }}
                >
                  <User size={18} color="#F97316" />
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}
                >
                  Ubah Profil
                </Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 16,
              }}
              activeOpacity={0.7}
              onPress={() => router.push("/(profile)/notification")}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DBEAFE",
                    position: "relative",
                  }}
                >
                  <Bell size={18} color="#3B82F6" />
                  {hasUnreadMsg && (
                    <View
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#EF4444",
                        borderWidth: 1.5,
                        borderColor: "#FFFFFF",
                        zIndex: 999,
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}
                >
                  Notifikasi
                </Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginTop: 12,
                marginBottom: 8,
                paddingHorizontal: 8,
              }}
            >
              Lainnya
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 16,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D1FAE5",
                  }}
                >
                  <Shield size={18} color="#10B981" />
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}
                >
                  Kebijakan Privasi
                </Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 16,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3E8FF",
                  }}
                >
                  <FileText size={18} color="#8B5CF6" />
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}
                >
                  Syarat & Ketentuan
                </Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 20,
                marginBottom: 8,
                paddingVertical: 14,
                borderRadius: 16,
                backgroundColor: "#FEF2F2",
                borderWidth: 1,
                borderColor: "#FEE2E2",
              }}
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <LogOut size={18} color="#EF4444" />
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#EF4444" }}
              >
                Keluar Akun
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text
            style={{
              alignSelf: "center",
              fontSize: 11,
              color: "#1F2A44",
              opacity: 0.4,
              marginTop: 24,
              fontWeight: "600",
            }}
          >
            VVastra Amerta v1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
