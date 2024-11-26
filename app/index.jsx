import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Link href="/login">
        <Text style={{ fontFamily: "outfit-bold" }}>
          Edit app/index.tsx to edit this syycreen.
        </Text>
      </Link>
    </View>
  );
}
