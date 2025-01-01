import React from "react";
import { Image, View, Text } from "react-native";
import Colors from "../../constants/Colors";

const OwnerInfo = ({ pet }) => {
  console.log(pet?.user);
  let userName = pet?.user?.name;
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Image
        source={{ uri: pet?.user?.imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 99 }}
      />
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 17,
          }}
        >
          {console.log(JSON.stringify(pet))}
        </Text>
        <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
          Pet Owner
        </Text>
      </View>
    </View>
  );
};

export default OwnerInfo;
