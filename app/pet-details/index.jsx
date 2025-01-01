import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";

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
      </ScrollView>
      {/* Adopt Me Button */}
    </View>
  );
}
