import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Shared from "../../Shared/Shared";
import { query, where } from "firebase/firestore";
import PetListItem from "../../components/Home/PetListItem";

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  // favIds

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  const GetFavPetIds = async () => {
    const result = await Shared.GetFavList(user);
    console.log(result?.favorites);
    setFavIds(result?.favorites);
    GetfavPetList();
  };

  // fetch related pet list
  const GetfavPetList = async () => {
    const q = query(collection(db, "Pets"), where("name", "in", favIds));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setFavPetList((pre) => [...pre, doc.data()]);
    });
  };
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        Favorites
      </Text>
      <FlatList
        data={favPetList}
        renderItem={(item, index) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
