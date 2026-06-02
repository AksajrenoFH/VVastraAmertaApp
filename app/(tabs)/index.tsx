import apiClient from "@/services/apiClient";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
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

export default function HomeScreen() {
  const [dashboardData, setDashboardData] = useState({
    username: "Pelanggan",
    readyToTake: 0,
    procesServices: 0,
    totalServices: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/dashboard");
      setDashboardData(res.data);
    } catch (e) {
      setDashboardData({
        username: "Pelanggan",
        readyToTake: 0,
        procesServices: 0,
        totalServices: 0,
      });

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

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
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          // 2. Pembungkusan refreshControl diperbaiki (kurung kurawal tunggal)
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#F97316"]}
              tintColor="#F97316"
            />
          }
        >
          {/* ====== HEADER ====== */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 32,
              borderColor: "#ffd485",
              borderBottomWidth: 2,
              paddingBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, color: "#555", fontWeight: "600" }}>
                Halo, Selamat Datang
              </Text>
              {isLoading ? (
                <ActivityIndicator size="small" color="#F97316" />
              ) : (
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    color: "#1F2A44",
                    marginTop: 2,
                  }}
                >
                  {dashboardData.username}
                </Text>
              )}
            </View>
            <Image
              source={require("@/assets/VVastra/logoVV.png")}
              style={{ width: 65, height: 65, marginLeft: "auto" }}
            />
          </View>

          {/* ====== CONTENT BODY ====== */}
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#1F2A44",
                marginBottom: 16,
                letterSpacing: 0.3,
              }}
            >
              Ringkasan Laundry Anda
            </Text>

            <View style={{ gap: 16, marginBottom: 24 }}>
              {/* Card Siap Diambil */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  borderRadius: 24,
                  padding: 24,
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "rgba(16, 185, 129, 0.2)",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: "#D1FAE5",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather name="check-circle" size={24} color="#10B981" />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "#9CA3AF",
                      letterSpacing: 1,
                    }}
                  >
                    SIAP DIAMBIL
                  </Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#10B981" />
                ) : (
                  <Text
                    style={{
                      fontSize: 36,
                      fontWeight: "800",
                      color: "#1F2A44",
                    }}
                  >
                    {dashboardData.readyToTake}{" "}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#10B981",
                      }}
                    >
                      Paket
                    </Text>
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    marginTop: 8,
                    fontWeight: "500",
                  }}
                >
                  Pakaian Anda sudah rapi & siap dijemput.
                </Text>
              </TouchableOpacity>

              {/* Baris Dua Kolom */}
              <View style={{ flexDirection: "row", gap: 16 }}>
                {/* Card Sedang Diproses */}
                <View
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    padding: 16,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#F97316",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: "#FFEDD5",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Feather name="refresh-cw" size={20} color="#F97316" />
                    </View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "#9CA3AF",
                        letterSpacing: 0.5,
                      }}
                    >
                      PROSES
                    </Text>
                  </View>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#F97316" />
                  ) : (
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#1F2A44",
                        marginTop: 4,
                      }}
                    >
                      {dashboardData.procesServices}{" "}
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#6B7280",
                        }}
                      >
                        Order
                      </Text>
                    </Text>
                  )}
                </View>

                {/* Card Total Transaksi */}
                <View
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    padding: 16,
                    backgroundColor: "#ffffff",
                    borderWidth: 1,
                    borderColor: "#3B82F6",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: "#DBEAFE",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Feather name="shopping-bag" size={20} color="#3B82F6" />
                    </View>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "#9CA3AF",
                        letterSpacing: 0.5,
                      }}
                    >
                      TOTAL
                    </Text>
                  </View>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#3B82F6" />
                  ) : (
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#1F2A44",
                        marginTop: 4,
                      }}
                    >
                      {dashboardData.totalServices}{" "}
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#6B7280",
                        }}
                      >
                        Trx
                      </Text>
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Footer Hak Cipta */}
          <Text
            style={{
              alignSelf: "center",
              fontSize: 11,
              color: "#1F2A44",
              opacity: 0.5,
              marginVertical: 10,
              fontWeight: "600",
            }}
          >
            VVastra Amerta © 2026
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
