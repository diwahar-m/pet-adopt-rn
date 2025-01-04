import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const OwnerInfo = ({ pet }) => {
  console.log(pet?.user);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: pet?.userImage }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
            }}
          >
            {pet?.userName}
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
      </View>
      <FontAwesome name="send" size={24} color={Colors.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    borderColor: Colors.PRIMARY,
  },
});

export default OwnerInfo;
