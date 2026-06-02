import {
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";

export default function CustomButton({ title, onPress, loading = false }: any) {
  return (
    <TouchableOpacity
      style={[
        {
          width: "100%",
          height: 50,
          backgroundColor: "#07694e",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        loading && {
          opacity: 0.7,
        },
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
