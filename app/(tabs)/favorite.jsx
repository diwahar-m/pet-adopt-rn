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
  const [loader, setLoader] = useState(false);
  // favIds

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    setLoader(false);
    GetfavPetList(result?.favorites);
  };

  // fetch related pet list
  const GetfavPetList = async (favId_) => {
    setLoader(true);
    setFavPetList([]);
    const q = query(collection(db, "Pets"), where("name", "in", favId_));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setFavPetList((pre) => [...pre, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        Favorites
      </Text>
      <FlatList
        data={favPetList}
        refreshing={loader}
        onRefresh={GetFavPetIds}
        renderItem={(item, index) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
