import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Shared from "../Shared/shared";
import { useUser } from "@clerk/clerk-expo";
const MarkFav = (pet) => {
  const { user } = useUser();
  const [favList, setFavList] = useState();

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const results = await Shared.GetFavList();
    console.log(results);
    setFavList(results.favorites ? result?.favorites : []);
  };
  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable>
          <Ionicons name="heart-outline" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable>
          <Ionicons name="heart-outline" size={30} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
