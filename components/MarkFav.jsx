import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Pressable, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Shared from "../Shared/Shared";
const MarkFav = ({ pet, color = "black" }) => {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    console.log("jjj");
    const results = await Shared.GetFavList(user);
    console.log("oo", results);
    setFavList(results.favorites ? results?.favorites : []);
  };

  const AddToFav = async () => {
    console.log("lll");
    const favResult = favList;
    console.log(favList, pet);
    favResult.push(pet?.name);
    await Shared.UpdateFav(user, favResult);
    GetFav();
  };

  const removeFromFav = async () => {
    const favResult = favList.filter((item) => item !== pet?.name);
    await Shared.UpdateFav(user, favResult);
    GetFav();
  };
  return (
    <View>
      {favList?.includes(pet.name) ? (
        <Pressable onPress={removeFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
