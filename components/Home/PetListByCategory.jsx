import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import PetListItem from "./PetListItem";
import { db } from "../../config/FirebaseConfig";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("Dogs");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    const pet_list = [];
    const querySnapshot = await getDocs(
      query(
        collection(db, "Pets"),
        where("category", "==", category ? category : "Dogs") // get category wise list from firebase
      )
    );

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      pet_list.push(doc.data());
    });
    setPetList(pet_list);
    setLoader(false);
  };

  return (
    <View>
      <Category
        category={(value) => {
          GetPetList(value);
        }}
      />
      <FlatList
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        style={{ marginTop: 10 }}
        data={petList}
        renderItem={(item) => <PetListItem pet={item} />}
      />
    </View>
  );
}
