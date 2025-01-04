import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      // makes status bar transparent & header title empty
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {/* Pet Info */}
        <PetInfo pet={pet} />
        {/* Pet Properties  */}
        <PetSubInfo pet={pet} />
        {/* About  */}
        <AboutPet pet={pet} />
        {/* Owner Details  */}
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adoptBtn}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
      {/* Adopt Me Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: { position: "absolute", bottom: 0 },
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  },
});
