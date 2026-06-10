import apiClient from "@/services/apiClient";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Filter,
  Search,
  ShoppingBag,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface Transaction {
  id: number | string;
  status: string;
  statusBg?: string;
  statusColor?: string;
  invoice: string;
  date: string;
  totalService: string | number;
  totalPrice: string | number;
}

const SkeletonLoadingCard = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.8)",
        marginBottom: 16,
        opacity: fadeAnim,
      }}
    >
      <View
        style={{
          width: 70,
          height: 20,
          backgroundColor: "#E5E7EB",
          borderRadius: 16,
          marginBottom: 12,
        }}
      />
      <View
        style={{
          width: "50%",
          height: 20,
          backgroundColor: "#E5E7EB",
          borderRadius: 8,
          marginBottom: 12,
        }}
      />
      <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
        <View
          style={{
            width: 80,
            height: 20,
            backgroundColor: "#E5E7EB",
            borderRadius: 8,
          }}
        />
        <View
          style={{
            width: 80,
            height: 20,
            backgroundColor: "#E5E7EB",
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          paddingTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 80,
            height: 18,
            backgroundColor: "#E5E7EB",
            borderRadius: 8,
          }}
        />
        <View
          style={{
            width: 50,
            height: 14,
            backgroundColor: "#E5E7EB",
            borderRadius: 8,
          }}
        />
      </View>
    </Animated.View>
  );
};

export default function TransactionScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const statusOptions = [
    { label: "Semua Status", value: "" },
    { label: "Menunggu", value: "queue" },
    { label: "Dicuci", value: "washed" },
    { label: "Disetrika", value: "ironed" },
    { label: "Diambil", value: "ready" },
    { label: "Selesai", value: "done" },
  ];

  const paymentOptions = [
    { label: "Semua Bayar", value: "" },
    { label: "Belum Lunas", value: "unpaid_partial" },
    { label: "Lunas", value: "paid" },
  ];

  const fetchData = async (
    search = searchQuery,
    status = selectedStatus,
    payment = selectedPayment,
  ) => {
    try {
      const res = await apiClient.get("/history", {
        params: {
          cari: search,
          status: status,
          payment: payment,
        },
      });
      const result =
        res.data && Array.isArray(res.data.transactions)
          ? res.data.transactions
          : [];
      setTransactionData(result);
    } catch (e) {
      setTransactionData([]);
      Toast.show({
        type: "error",
        text1: "Gagal Memuat Data",
        text2: "Hubungi Admin untuk mengecek akun Anda!",
        position: "top",
        visibilityTime: 3000,
      });
      console.log(e);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData(searchQuery, selectedStatus, selectedPayment);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setIsLoading(true);
    fetchData(searchQuery, status, selectedPayment);
  };

  const handlePaymentFilter = (payment: string) => {
    setSelectedPayment(payment);
    setIsLoading(true);
    fetchData(searchQuery, selectedStatus, payment);
  };

  const handleSearchSubmit = () => {
    setIsLoading(true);
    fetchData(searchQuery, selectedStatus, selectedPayment);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsLoading(true);
    fetchData("", selectedStatus, selectedPayment);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const renderItem = ({ item: t }: { item: Transaction }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/(transaction)/show", params: { id: t.id } })
        }
        activeOpacity={0.9}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          padding: 16,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.8)",
          shadowColor: "#1F2A44",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 3,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <ClipboardList size={18} color="#1F2A44" />
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#1F2A44" }}
            >
              {t.invoice}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
              backgroundColor: t.statusBg || "#E5E7EB",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "800",
                color: t.statusColor || "#1F2937",
                textTransform: "uppercase",
              }}
            >
              {t.status === "done"
                ? "Selesai"
                : t.status === "ready"
                  ? "Siap Diambil"
                  : "Proses"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            marginBottom: 16,
            opacity: 0.8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <CalendarDays size={14} color="#6B7280" />
            <Text style={{ fontSize: 12, color: "#6B7280", fontWeight: "600" }}>
              {t.date}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <ShoppingBag size={14} color="#6B7280" />
            <Text style={{ fontSize: 12, color: "#6B7280", fontWeight: "600" }}>
              {t.totalService}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#F3F4F6",
            paddingTop: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <CircleDollarSign size={18} color="#F97316" />
            <Text style={{ fontSize: 16, fontWeight: "800", color: "#F97316" }}>
              {t.totalPrice}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#427AB5" }}
            >
              Detail
            </Text>
            <ChevronRight size={14} color="#427AB5" />
          </View>
        </View>
      </TouchableOpacity>
    );
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
        <FlatList
          data={transactionData}
          keyExtractor={(t) => t.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 80,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#1F2A44"]}
              tintColor="#1F2A44"
            />
          }
          ListHeaderComponent={
            <View style={{ marginBottom: 20 }}>
              {/* Header Title */}
              <View
                style={{
                  marginBottom: 16,
                  borderColor: "rgba(31, 42, 68, 0.1)",
                  borderBottomWidth: 1,
                  paddingBottom: 14,
                }}
              >
                <Text
                  style={{ fontSize: 26, fontWeight: "bold", color: "#1F2A44" }}
                >
                  Riwayat Transaksi
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#555",
                    marginTop: 4,
                    fontWeight: "500",
                  }}
                >
                  Pantau status cucian dan transaksi Anda
                </Text>
              </View>

              {/* Input Pencarian */}
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 14,
                  alignItems: "center",
                  paddingHorizontal: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 6,
                  elevation: 2,
                  marginBottom: 14,
                }}
              >
                <Search size={18} color="rgba(31, 42, 68, 0.4)" />
                <TextInput
                  placeholder="Cari nomor invoice..."
                  placeholderTextColor="rgba(31, 42, 68, 0.4)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearchSubmit}
                  returnKeyType="search"
                  autoCapitalize="characters"
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    fontSize: 13,
                    fontWeight: "500",
                    color: "#1F2A44",
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={clearSearch}>
                    <X size={16} color="rgba(31, 42, 68, 0.5)" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Filter Status Laundry */}
              <View style={{ marginBottom: 8 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 6,
                    paddingRight: 10,
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: 2 }}>
                    <Filter size={14} color="#1F2A44" />
                  </View>
                  {statusOptions.map((opt) => {
                    const isSelected = selectedStatus === opt.value;
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        onPress={() => handleStatusFilter(opt.value)}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: isSelected
                            ? "#427AB5"
                            : "rgba(255, 255, 255, 0.6)",
                          borderWidth: 1,
                          borderColor: isSelected
                            ? "#427AB5"
                            : "rgba(31, 42, 68, 0.1)",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "bold",
                            color: isSelected ? "#FFFFFF" : "#1F2A44",
                          }}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Filter Status Pembayaran */}
              <View style={{ marginBottom: 4 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 6,
                    paddingRight: 10,
                    paddingLeft: 20,
                  }}
                >
                  {paymentOptions.map((opt) => {
                    const isSelected = selectedPayment === opt.value;
                    return (
                      <TouchableOpacity
                        key={opt.value}
                        onPress={() => handlePaymentFilter(opt.value)}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: isSelected
                            ? "#F97316"
                            : "rgba(255, 255, 255, 0.6)",
                          borderWidth: 1,
                          borderColor: isSelected
                            ? "#F97316"
                            : "rgba(31, 42, 68, 0.1)",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "bold",
                            color: isSelected ? "#FFFFFF" : "#1F2A44",
                          }}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <View>
                <SkeletonLoadingCard />
                <SkeletonLoadingCard />
                <SkeletonLoadingCard />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#1F2A44",
                  marginTop: 24,
                  fontWeight: "500",
                }}
              >
                Tidak ada transaksi yang dipesan
              </Text>
            )
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
