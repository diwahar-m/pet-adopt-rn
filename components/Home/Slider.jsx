import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    const sliders = [];
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      sliders.push(doc.data());
    });
    setSliderList(sliders);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles?.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
