import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Slider() {
  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
