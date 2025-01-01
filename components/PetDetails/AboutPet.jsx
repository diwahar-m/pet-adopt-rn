import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../../constants/Colors";

const AboutPet = ({ pet }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        About {pet?.name}{" "}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 20}
        style={{
          fontFamily: "outfit",
          fontSize: 16,
        }}
      >
        {pet?.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            Read More
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default AboutPet;
