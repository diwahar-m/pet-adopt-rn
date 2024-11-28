import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../config/FirebaseConfig";
import Colors from "../../constants/Colors";
import { collection, getDocs } from "firebase/firestore";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("Dogs");
  useEffect(() => {
    GetCategories();
  }, []);
  const GetCategories = async () => {
    const categories = [];
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      {categoryList?.length > 0 && (
        <FlatList
          data={categoryList}
          numColumns={4}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.container,
                  selectedCategory === item.name &&
                    styles.selectedCategoryContainer,
                ]}
              >
                <Image
                  source={{ uri: item?.imageUrl }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
                {item?.name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
