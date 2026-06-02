import apiClient from "@/services/apiClient";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { Home, Receipt, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);
  const [hasUnreadMsg, setHasUnreadMsg] = useState(false);

  useEffect(() => {
    const fetchTabStatus = async () => {
      try {
        const res = await apiClient.get("/notification");
        const unread = res.data.notifications.some(
          (item: any) => !item.is_read,
        );
        setHasUnreadMsg(unread);
      } catch (e) {
        console.log(e);
      }
    };

    fetchTabStatus();
    const int = setInterval(fetchTabStatus, 10000); // jalanin fetch-nya tiap 10 detik
    return () => clearInterval(int);
  }, [state.index]);

  // Padding inside the tab bar container
  const paddingHorizontal = 8;
  const innerWidth = containerWidth - paddingHorizontal * 2;
  const tabWidth = innerWidth > 0 ? innerWidth / state.routes.length : 0;

  const translateX = useSharedValue(0);

  useEffect(() => {
    if (tabWidth > 0) {
      translateX.value = withSpring(state.index * tabWidth, {
        damping: 18,
        stiffness: 120,
        mass: 0.8,
      });
    }
  }, [state.index, tabWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width: tabWidth,
    };
  });

  const triggerHaptic = () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99,
        bottom: Math.max(insets.bottom, 16),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          paddingVertical: 8,
          paddingHorizontal,
          shadowColor: "#1F2A44",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
          borderWidth: 1,
          borderColor: "rgba(249, 115, 22, 0.08)",
          width: "100%",
          position: "relative",
          alignItems: "center",
        }}
        onLayout={(e) => {
          setContainerWidth(e.nativeEvent.layout.width);
        }}
      >
        {tabWidth > 0 && (
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 8,
                bottom: 8,
                left: 8, // align with paddingHorizontal of tabBar
                justifyContent: "center",
                alignItems: "center",
                zIndex: 0,
              },
              animatedStyle,
            ]}
          >
            <View
              style={{
                width: "90%",
                height: "100%",
                backgroundColor: "rgba(249, 115, 22, 0.11)",
                borderRadius: 16,
              }}
            />
          </Animated.View>
        )}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            triggerHaptic();
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Custom labels matching the design theme
          let labelText = "Home";
          if (route.name === "index") labelText = "Home";
          else if (route.name === "transaction") labelText = "Transaksi";
          else if (route.name === "profile") labelText = "Profil";

          const activeColor = "#F97316";
          const inactiveColor = "#7C7A7A";

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                zIndex: 1,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                {getIcon(route.name, isFocused ? activeColor : inactiveColor)}
                {route.name === "profile" && hasUnreadMsg && (
                  <View
                    style={{
                      position: "absolute",
                      top: -2,
                      right: 4,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#EF4444",
                      borderWidth: 1.5,
                      borderColor: "#FFFFFF",
                    }}
                  />
                )}
                <Text
                  style={{
                    fontSize: 11,
                    letterSpacing: 0.2,
                    color: isFocused ? activeColor : inactiveColor,
                    fontWeight: isFocused ? "700" : "500",
                  }}
                >
                  {labelText}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const getIcon = (routeName: string, color: string) => {
  const size = 20;
  const strokeWidth = 2.2;
  switch (routeName) {
    case "index":
      return <Home color={color} size={size} strokeWidth={strokeWidth} />;
    case "transaction":
      return <Receipt color={color} size={size} strokeWidth={strokeWidth} />;
    case "profile":
      return <User color={color} size={size} strokeWidth={strokeWidth} />;
    default:
      return <Home color={color} size={size} strokeWidth={strokeWidth} />;
  }
};
