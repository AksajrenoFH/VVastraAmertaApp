import apiClient from "@/services/apiClient";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Bell, ChevronLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface NotificationProps {
  id: number;
  title: string;
  message: string;
  invoice_id: string | null;
  is_read: boolean;
  created_at: string;
}

export default function Notification() {
  const router = useRouter();
  const [notif, setNotif] = useState<NotificationProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/notification");
      setNotif(res.data.notifications);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Gagal Memuat Data",
        text2: "Hubungi Admin untuk mengecek akun Anda!",
        position: "top",
        visibilityTime: 3000,
      });
      console.log(e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handlePressNotif = async (id: number, isRead: boolean) => {
    if (!isRead) {
      setNotif((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_read: true } : item,
        ),
      );
      try {
        await apiClient.post(`/notification/${id}/read`);
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "Gagal Memuat Data",
          text2: "Hubungi Admin untuk mengecek akun Anda!",
          position: "top",
          visibilityTime: 3000,
        });
        console.log(e);
      }
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }
  return (
    <LinearGradient
      colors={["#FFE8BE", "#FFD4BF", "#F6CEAF"]}
      locations={[0, 0.54, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header dengan tombol kembali */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingTop: 20,
            marginBottom: 24,
            borderColor: "#ffd485",
            borderBottomWidth: 2,
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 12, padding: 4 }}
          >
            <ChevronLeft size={24} color="#1F2A44" />
          </TouchableOpacity>
          <View>
            <Text
              style={{ fontSize: 26, fontWeight: "bold", color: "#1F2A44" }}
            >
              Notifikasi
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#555",
                marginTop: 2,
                fontWeight: "500",
              }}
            >
              Informasi mengenai status cucian Anda
            </Text>
          </View>
        </View>

        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#F97316" />
          </View>
        ) : (
          <FlatList
            data={notif}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 110,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={["#F97316"]}
                tintColor="#F97316"
              />
            }
            ListEmptyComponent={
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                  padding: 30,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <Text
                  style={{ color: "#9CA3AF", fontSize: 14, fontWeight: "500" }}
                >
                  Belum ada notifikasi baru
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handlePressNotif(item.id, item.is_read)}
                style={{
                  flexDirection: "row",
                  backgroundColor: item.is_read
                    ? "rgba(255, 255, 255, 0.75)"
                    : "#FFFFFF",
                  padding: 18,
                  borderRadius: 22,
                  marginBottom: 14,
                  borderWidth: 1,
                  borderColor: item.is_read
                    ? "rgba(255, 255, 255, 0.4)"
                    : "#F97316",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: item.is_read ? 0.02 : 0.05,
                  shadowRadius: 8,
                }}
              >
                {/* Icon Bulat Kiri */}
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: item.is_read ? "#F3F4F6" : "#FFEDD5",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                  }}
                >
                  <Bell
                    size={20}
                    color={item.is_read ? "#9CA3AF" : "#F97316"}
                  />
                </View>

                {/* Konten Utama Teks */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: item.is_read ? "600" : "bold",
                        color: "#1F2A44",
                        width: "88%",
                        lineHeight: 20,
                      }}
                    >
                      {item.title}
                    </Text>

                    {/* Titik Indikator Merah Unread */}
                    {!item.is_read && (
                      <View
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 4.5,
                          backgroundColor: "#EF4444",
                          marginTop: 6,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: item.is_read ? "#6B7280" : "#374151",
                      marginTop: 6,
                      lineHeight: 18,
                    }}
                  >
                    {item.message}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
