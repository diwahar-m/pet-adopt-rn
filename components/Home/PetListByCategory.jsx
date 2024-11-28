import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Category from "./Category";
import { collection, getDocs, query } from "firebase/firestore";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    GetPetList();
  }, []);

  const GetPetList = async (category) => {
    const q = query(
      collection(db, "Pets"),
      where("category", "==", category ? category : "Dogs") // get category wise list from firebase
    );
    const pet_list = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      pet_list.push(doc.data());
    });
    setPetList((prev) => [...prev, pet_list]);
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList}
        renderItem={(item) => <PetListItem pet={item} />}
      />
    </View>
  );
}
