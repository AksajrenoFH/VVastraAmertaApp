import apiClient from "@/services/apiClient";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Lock,
  MapPin,
  Phone,
  Tag,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Edit() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [shortname, setShortname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await apiClient.get("/profile");
        if (res.data && res.data.user) {
          const userData = res.data.user;
          setName(userData.name);
          setShortname(userData.customer?.shortname);
          setPhoneNumber(userData.customer?.phone_number);
          setAddress(userData.customer?.address);
          setPassword("");
        }
      } catch (e) {
        console.log(e);
        Toast.show({
          type: "error",
          text1: "Gagal Memuat Data",
          text2: "Hubungi Admin untuk mengecek akun Anda!",
          position: "top",
          visibilityTime: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleUpdate = async () => {
    if (!name || !shortname || !phoneNumber || !address) {
      Toast.show({
        type: "error",
        text1: "Gagal Memuat Data",
        text2: "Mohon untuk isi semua kolom yang tersedia! Kecuali password!",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: any = {
        name,
        shortname,
        phone_number: phoneNumber,
        address,
      };

      if (password && password.trim().length > 0) {
        payload.password = password;
      }

      const res = await apiClient.put("/profile", payload);

      if (res.data.success) {
        Toast.show({
          type: "success",
          text1: "Profil Diperbarui",
          text2: "Data Anda berhasil diubah!",
          position: "top",
          visibilityTime: 3000,
        });
        router.back();
      }
    } catch (e: any) {
      console.log(e);
      const errs = e?.response?.data?.errors as any;
      let errMsg = "Terjadi kesalahan pada sistem!";

      if (errs) {
        const errorArrays = Object.values(errs as Record<string, any>);
        if (errorArrays.length > 0 && Array.isArray(errorArrays[0])) {
          errMsg = errorArrays[0][0] as string;
        }
      } else if (e?.response?.data?.message) {
        errMsg = e.response.data.message;
      } else {
        errMsg = e.message;
      }

      Toast.show({
        type: "error",
        text1: "Gagal Mengubah Data",
        text2: String(errMsg),
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFE8BE",
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
        {/* Navigation Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingVertical: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              justifyContent: "center",
              alignItems: "center",
              elevation: 2,
              shadowOpacity: 0.05,
            }}
          >
            <ChevronLeft size={22} color="#1F2A44" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1F2A44",
              marginLeft: 16,
            }}
          >
            Ubah Profil
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 20,
              marginTop: 8,
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
            }}
          >
            {/* Input Nama Lengkap */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#6B7280",
                marginBottom: 6,
              }}
            >
              Nama Lengkap
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 14,
                paddingHorizontal: 12,
                marginBottom: 16,
              }}
            >
              <User size={18} color="#9CA3AF" />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  color: "#1F2A44",
                }}
                placeholder="Masukkan nama lengkap"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Input Nama Panggilan */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#6B7280",
                marginBottom: 6,
              }}
            >
              Nama Panggilan
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 14,
                paddingHorizontal: 12,
                marginBottom: 16,
              }}
            >
              <Tag size={18} color="#9CA3AF" />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  color: "#1F2A44",
                }}
                placeholder="Masukkan nama panggilan"
                value={shortname}
                onChangeText={setShortname}
              />
            </View>

            {/* Input Nomor HP */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#6B7280",
                marginBottom: 6,
              }}
            >
              Nomor Handphone
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 14,
                paddingHorizontal: 12,
                marginBottom: 16,
              }}
            >
              <Phone size={18} color="#9CA3AF" />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  color: "#1F2A44",
                }}
                placeholder="Contoh: 08123456789"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            {/* Input Alamat Tempat Tinggal */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#6B7280",
                marginBottom: 6,
              }}
            >
              Alamat Rumah
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                backgroundColor: "#F9FAFB",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 14,
                paddingHorizontal: 12,
                marginBottom: 16,
                paddingTop: 10,
              }}
            >
              <MapPin size={18} color="#9CA3AF" style={{ marginTop: 2 }} />
              <TextInput
                style={{
                  flex: 1,
                  minHeight: 80,
                  textAlignVertical: "top",
                  paddingHorizontal: 10,
                  color: "#1F2A44",
                  paddingBottom: 10,
                }}
                placeholder="Masukkan alamat lengkap Anda"
                multiline
                numberOfLines={3}
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Input Password (Opsional) */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#6B7280",
                marginBottom: 2,
              }}
            >
              Password Baru (Opsional)
            </Text>
            <Text style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6 }}>
              Kosongkan kolom ini jika tidak ingin mengubah password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 14,
                paddingHorizontal: 12,
                marginBottom: 24,
              }}
            >
              <Lock size={18} color="#9CA3AF" />
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  color: "#1F2A44",
                }}
                placeholder="Masukkan password baru minimum 8 karakter"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Tombol Simpan Perubahan */}
            <TouchableOpacity
              onPress={handleUpdate}
              disabled={isSubmitting}
              style={{
                backgroundColor: "#F97316",
                borderRadius: 16,
                paddingVertical: 14,
                alignItems: "center",
                justifyContent: "center",
                opacity: isSubmitting ? 0.7 : 1,
                elevation: 2,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text
                  style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 15 }}
                >
                  Simpan Perubahan
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
