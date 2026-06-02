import CustomButton from "@/components/vvastra/CustomButton";
import CustomInput from "@/components/vvastra/CustomInput";
import { authService } from "@/services/authServices";
import { AxiosError } from "axios";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [wrongAttempts, setWrongAttempts] = useState(0);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Gagal Masuk",
        text2: "Mohon untuk isi semua kolom yang tersedia!",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    if (wrongAttempts >= 3) {
      Toast.show({
        type: "error",
        text1: "Gagal Masuk",
        text2: "Hubungi Admin untuk mengecek akun Anda!",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.login(email, password);

      setWrongAttempts(0);

      Toast.show({
        type: "success",
        text1: "Berhasil Masuk",
        text2: "Selamat datang, " + data.user.name,
        position: "top",
        visibilityTime: 3000,
      });

      router.replace("/(tabs)");
    } catch (e) {
      const err = e as AxiosError<{ message?: string }>;

      if (err.code === "ECONNABORTED") {
        // kalo koneksinya diputus atau terputus sama srvernya
        Toast.show({
          type: "error",
          text1: "Gagal Masuk",
          text2: "Koneksi terputus, silahkan coba lagi!",
          position: "top",
          visibilityTime: 3000,
        });
      } else if (err.response) {
        const status = err.response.status;
        const serverMsg = err.response.data?.message;

        if (status === 401 || status === 422) {
          // kalo misal salah masukin email atau password
          const currentAttempts = wrongAttempts + 1;
          setWrongAttempts(currentAttempts);

          Toast.show({
            type: "error",
            text1: "Gagal Masuk",
            text2: "Email atau password salah, silahkan coba lagi!",
            position: "top",
          });
        } else {
          // ini kalo status code-nya yang lain
          Toast.show({
            type: "error",
            text1: `Gagal Masuk ${status}`,
            text2: serverMsg || "Terjadi kesalahan, silahkan coba lagi!",
            position: "top",
          });
        }
      } else {
        // Klo misal status code-nya 500 atawa 404
        Toast.show({
          type: "error",
          text1: "Masalah Server",
          text2: "Terjadi kesalahan, silahkan coba lagi nanti!",
          position: "top",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={["#FFE8BE", "#FFD4BF", "#F6CEAF"]}
      locations={[0, 0.54, 1]}
      style={{
        flex: 1,
        width: "100%",
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <Image
                source={require("@/assets/VVastra/logoVV.png")}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <View
                style={{
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#07694e",
                    marginBottom: 8,
                    textTransform: "capitalize",
                  }}
                >
                  masuk akun
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 20,
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                >
                  silakan login terlebih dahulu untuk {"\n"}bisa mengakses
                  aplikasinya
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: 22,
                padding: 20,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <CustomInput
                label="Email"
                placeholder="example@mail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <CustomInput
                label="Password"
                placeholder="Masukkan kata sandi Anda"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <CustomButton
                title="Masuk"
                onPress={handleLogin}
                loading={isLoading}
              />
            </View>
          </ScrollView>
          <Text style={{ marginBottom: 20, alignSelf: "center", fontSize: 12 }}>
            VVastra Amerta © 2026
            <Text>
              <Text style={{ color: "#07694e" }}>Privacy Policy</Text> dan{" "}
              <Text style={{ color: "#07694e" }}>Terms of Service</Text>
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
