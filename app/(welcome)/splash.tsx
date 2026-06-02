import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Animated, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    async function loadReasource() {
      try {
        await Asset.loadAsync([require("@/assets/VVastra/logo.png")]);

        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (e) {
        Alert.alert("Gagal Memuat Aplikasi");
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    loadReasource();
  }, []);

  useEffect(() => {
    if (isReady) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(scaleAnim, {
          toValue: 3.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        router.replace("/login");
      });
    }
  }, [isReady]);
  return (
    <LinearGradient
      colors={["#FFE8BE", "#FFD4BF", "#F6CEAF"]}
      locations={[0, 0.54, 1]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          flex: 1,
          width: "100%",
        }}
      >
        <Image
          source={require("@/assets/VVastra/logo.png")}
          style={{ width: 250, height: 250 }}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            height: 150,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#07694e" }}>
            VVelome to
            <Text style={{ fontWeight: "bold" }}> VVastra Amerta</Text>
          </Text>
          <View style={{ gap: 10 }}>
            <ActivityIndicator size="large" color="#07694e" />
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#07694e" }}
            >
              Mohon Tunggu Sebentar
            </Text>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}
