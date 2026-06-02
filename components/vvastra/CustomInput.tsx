import { Text, TextInput, View } from "react-native";

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
}: any) {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 15,
      }}
    >
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#07694e",
            marginBottom: 5,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#FFF",
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#FFD4BF",
          color: "#333",
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}
