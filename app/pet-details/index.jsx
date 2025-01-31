import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { db } from "../../config/FirebaseConfig";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      // makes status bar transparent & header title empty
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + "_" + pet?.email;
    const docId2 = pet?.email + "_" + user?.primaryEmailAddress?.emailAddress;
    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data);
      router.push({
        pathname: "/chat",
        params: { id: doc.id },
      });
    });

    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.userName,
          },
        ],
      });
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    }
  };

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
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
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
  bottomContainer: { position: "absolute", bottom: 0, width: "100%" },
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  },
});
