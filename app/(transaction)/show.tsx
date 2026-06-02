import apiClient from "@/services/apiClient";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  CameraOff,
  CheckCircle2,
  CircleX,
  Clock,
  Layers,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface Services {
  id: number | string;
  name: string;
  price: string;
  unit: string;
  estimatedDay: string;
  quantity: string;
}

interface Transaction {
  id: number | string;
  invoice: string;
  status: string;
  statusBg?: string;
  statusColor?: string;
  paymentStatus: string;
  paymentStatusBg: string;
  paymentStatusColor: string;
  totalPrice: string;
  totalEstimatedDay: string;
  createdAt: string;
  admin: string;
  paymentMethod: string;
  paidAt: string;
  transferProof: string | any;
  clothesPhoto: string | any;
  service: Services[];
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
        opacity: fadeAnim,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <View
          style={{
            width: 100,
            height: 20,
            backgroundColor: "#E5E7EB",
            borderRadius: 16,
            marginBottom: 12,
          }}
        />
        <View
          style={{
            width: 200,
            height: 40,
            backgroundColor: "#E5E7EB",
            borderRadius: 16,
            marginBottom: 12,
          }}
        />

        <View style={{ flexDirection: "row", gap: 8 }}>
          <View
            style={{
              width: 65,
              height: 25,
              backgroundColor: "#E5E7EB",
              borderRadius: 16,
            }}
          />
          <View
            style={{
              width: 65,
              height: 25,
              backgroundColor: "#E5E7EB",
              borderRadius: 16,
            }}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#F3F4F6",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              width: 140,
              height: 25,
              backgroundColor: "#E5E7EB",
              borderRadius: 16,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <View style={{ flex: 1, paddingRight: 16 }}>
            <View
              style={{
                width: 70,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: 60,
                height: 15,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 50,
                height: 15,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: 45,
                height: 15,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: 16,
            padding: 16,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <View>
            <View
              style={{
                width: 90,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: 80,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 80,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: 45,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#F3F4F6",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              width: 180,
              height: 25,
              backgroundColor: "#E5E7EB",
              borderRadius: 16,
            }}
          />
        </View>

        <View style={{ gap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 90,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 30,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 95,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 40,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 90,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 50,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 105,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 50,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#F3F4F6",
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: 90,
                height: 20,
                backgroundColor: "#E5E7EB",
                borderRadius: 16,
                marginBottom: 6,
              }}
            />
            <View
              style={{
                width: "100%",
                height: 100,
                borderRadius: 14,
                backgroundColor: "#E5E7EB",
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: 90,
                height: 20,
                borderRadius: 14,
                backgroundColor: "#E5E7EB",
                marginBottom: 6,
              }}
            />
            <View
              style={{
                width: "100%",
                height: 100,
                borderRadius: 14,
                backgroundColor: "#E5E7EB",
              }}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default function Show() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [detail, setDetail] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImgPress = (imgUrl: any) => {
    setSelectedImg(imgUrl);
    setModalVisible(true);
  };

  const fetchData = async () => {
    try {
      const res = await apiClient.get(`/detail/${id}`);
      if (res.data && res.data.transaction) {
        setDetail(res.data.transaction);
      } else {
        setDetail(null);
      }
    } catch (e: any) {
      setDetail(null);
      Toast.show({
        type: "error",
        text1: "Gagal Memuat Data",
        text2:
          e?.response?.data?.error_msg ||
          e?.message ||
          "Hubungi Admin untuk mengecek akun Anda!",
        position: "top",
        visibilityTime: 3000,
      });
      console.log("Detail fetch error:", e?.response?.data || e?.message || e);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (id) {
      await fetchData();
    } else {
      setIsRefreshing(false);
    }
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
        {/* 1. Header Navigation */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ padding: 4 }}
          >
            <ArrowLeft size={22} color="#1F2A44" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#1F2A44" }}>
            Detail Nota
          </Text>
          <View style={{ width: 26 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          {isLoading ? (
            <SkeletonLoadingCard />
          ) : detail ? (
            <>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 16,
                  alignItems: "center",
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
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#9CA3AF",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  NOMOR INVOICE
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "900",
                    color: "#1F2A44",
                    letterSpacing: 0.5,
                    marginBottom: 12,
                  }}
                >
                  {detail.invoice}
                </Text>

                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View
                    style={{
                      backgroundColor: detail.statusBg,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 100,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="clip"
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: detail.statusColor,
                        textTransform: "capitalize",
                        paddingRight: 3,
                      }}
                    >
                      {detail.status === "done"
                        ? "Selesai"
                        : detail.status === "ready"
                          ? "Siap Diambil"
                          : detail.status === "ironed"
                            ? "Disetrika"
                            : detail.status === "washed"
                              ? "Dicuci"
                              : detail.status === "queue"
                                ? "Mengantri"
                                : "null"}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: detail.paymentStatusBg,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 100,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {detail.paymentStatus === "paid" ? (
                      <CheckCircle2
                        size={12}
                        color={detail.paymentStatusColor}
                      />
                    ) : (
                      <CircleX size={12} color={detail.paymentStatusColor} />
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "800",
                        color: detail.paymentStatusColor,
                        textTransform: "capitalize",
                        paddingRight: 2,
                      }}
                    >
                      {detail.paymentStatus}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 3. Section: Rincian Layanan & Harga */}
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#F3F4F6",
                    paddingBottom: 10,
                  }}
                >
                  <Layers size={18} color="#F97316" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: "#1F2A44",
                    }}
                  >
                    Rincian Laundry
                  </Text>
                </View>

                {/* Loop Item Layanan */}
                {detail.service.map((item, index) => (
                  <View
                    key={item.id ? item.id.toString() : index.toString()}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 14,
                    }}
                  >
                    <View style={{ flex: 1, paddingRight: 16 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "700",
                          color: "#1F2A44",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#9CA3AF",
                          marginTop: 2,
                          fontWeight: "500",
                        }}
                      >
                        {item.estimatedDay}
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "800",
                          color: "#1F2A44",
                        }}
                      >
                        {item.quantity} {item.unit}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: "#F97316",
                          marginTop: 2,
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                ))}

                {/* Kotak Total */}
                <View
                  style={{
                    backgroundColor: "#F9FAFB",
                    borderRadius: 16,
                    padding: 16,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "#6B7280",
                      }}
                    >
                      TOTAL TAGIHAN
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "900",
                        color: "#F97316",
                        marginTop: 2,
                      }}
                    >
                      {detail.totalPrice}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "#6B7280",
                      }}
                    >
                      MAX ESTIMASI
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "800",
                        color: "#1F2A44",
                        marginTop: 4,
                      }}
                    >
                      {detail.totalEstimatedDay}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 5. Section: Logistik & Pembayaran */}
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#F3F4F6",
                    paddingBottom: 10,
                  }}
                >
                  <Clock size={18} color="#F97316" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: "#1F2A44",
                    }}
                  >
                    Logistik & Pembayaran
                  </Text>
                </View>

                <View style={{ gap: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        fontWeight: "500",
                      }}
                    >
                      Waktu Masuk
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#1F2A44",
                      }}
                    >
                      {detail.createdAt}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        fontWeight: "500",
                      }}
                    >
                      Petugas Kasir
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#1F2A44",
                      }}
                    >
                      {detail.admin}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        fontWeight: "500",
                      }}
                    >
                      Metode Bayar
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#1F2A44",
                      }}
                    >
                      {detail.paymentMethod}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        fontWeight: "500",
                      }}
                    >
                      Waktu Pelunasan
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: "#1F2A44",
                      }}
                    >
                      {detail.paidAt}
                    </Text>
                  </View>
                </View>

                {/* Lampiran Gambar */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    marginTop: 16,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "#9CA3AF",
                        marginBottom: 6,
                      }}
                    >
                      BUKTI TRANSFER
                    </Text>
                    {detail.transferProof ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleImgPress(detail.transferProof)}
                      >
                        <Image
                          source={{ uri: detail.transferProof }}
                          style={{
                            width: "100%",
                            height: 100,
                            borderRadius: 14,
                            backgroundColor: "#F3F4F6",
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          width: "100%",
                          height: 100,
                          borderRadius: 14,
                          backgroundColor: "#F3F4F6",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {detail.paymentMethod === "transfer" ? (
                          <View
                            style={{
                              width: "100%",
                              height: 100,
                              borderRadius: 14,
                              backgroundColor: "#F3F4F6",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CameraOff
                              color="#9CA3AF"
                              size={20}
                              strokeWidth={1.5}
                            />
                            <Text style={{ fontSize: 11, color: "#9CA3AF" }}>
                              Tidak ada bukti
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: "100%",
                              height: 100,
                              borderRadius: 14,
                              backgroundColor: "#F3F4F6",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CameraOff
                              color="#9CA3AF"
                              size={20}
                              strokeWidth={1.5}
                            />
                            <Text
                              style={{
                                fontSize: 11,
                                color: "#9CA3AF",
                                textAlign: "center",
                              }}
                            >
                              Anda membayar dengan uang tunai
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "#9CA3AF",
                        marginBottom: 6,
                      }}
                    >
                      FOTO PAKAIAN
                    </Text>
                    {detail.clothesPhoto ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleImgPress(detail.clothesPhoto)}
                      >
                        <Image
                          source={{ uri: detail.clothesPhoto }}
                          style={{
                            width: "100%",
                            height: 100,
                            borderRadius: 14,
                            backgroundColor: "#F3F4F6",
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          width: "100%",
                          height: 100,
                          borderRadius: 14,
                          backgroundColor: "#F3F4F6",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CameraOff
                          color="#9CA3AF"
                          size={20}
                          strokeWidth={1.5}
                        />
                        <Text style={{ fontSize: 11, color: "#9CA3AF" }}>
                          Tidak ada foto
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </>
          ) : (
            <Text
              style={{ textAlign: "center", color: "#1F2A44", marginTop: 20 }}
            >
              Data tidak ditemukan
            </Text>
          )}
          <Text
            style={{
              alignSelf: "center",
              fontSize: 11,
              color: "#1F2A44",
              opacity: 0.5,
              marginTop: 16,
              fontWeight: "600",
            }}
          >
            VVastra Amerta © 2026
          </Text>
        </ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Tombol Close di pojok kanan atas */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: "absolute",
                top: 50,
                right: 20,
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: 8,
                borderRadius: 20,
              }}
            >
              <X color="#FFFFFF" size={24} />
            </TouchableOpacity>

            {/* Gambar ukuran besar */}
            {selectedImg && (
              <Image
                source={{ uri: selectedImg }}
                style={{
                  width: "90%",
                  height: "70%",
                  borderRadius: 16,
                }}
                resizeMode="contain" // Supaya gambar tidak terpotong dan proporsional
              />
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
