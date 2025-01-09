import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { UpdateFav, GetFavList } from "../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
const MarkFav = ({ pet }) => {
  const { user } = useUser();
  const [favList, setFavList] = useState();

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const results = await GetFavList();
    console.log(results);
    setFavList(results.favorites ? result?.favorites : []);
  };

  const AddToFav = async (user, favorites) => {
    const favResult = favList;
    favResult.push(pet.id);
    await UpdateFav(user, favResult);
    GetFav();
  };

  const removeFromFav = async () => {
    const favResult = favList.filter((item) => item != pet.id);
  };
  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={removeFromFav}>
          <Ionicons name="heart-outline" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={30} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
