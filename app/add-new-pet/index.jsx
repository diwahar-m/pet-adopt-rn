import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const navigation = useNavigation();
  const router = useRouter();
  const user = useUser();
  const [formData, setFormData] = useState({
    category: "Dogs",
    sex: "Male",
  });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    const categories = [];
    const categoryRef = collection(db, "Category");
    const snapshot = await getDocs(categoryRef);
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = () => {
    if (Object.keys(formData)?.length != 8) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }

    UploadImage();
  };

  const UploadImage = async () => {
    setLoader(true);
    const res = await fetch(image);
    const blobImage = await res.blob();
    const { data, error } = await supabase.storage
      .from("pet-adopt")
      .upload(`${Date.now()}.jpg`, blobImage);
    if (data) {
      SaveFromData(data);
    } else if (error) {
      ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT);
    }
  };

  const SaveFromData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for adoption
      </Text>
      <Pressable onPress={imagePicker}>
        {image ? (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
            source={{ uri: image }}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
            source={require("./../../assets/images/login.png")}
          />
        )}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
          style={styles.input}
        >
          {categoryList?.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          keyboardType="numeric-pad"
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
          style={styles.input}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          keyboardType="numeric-pad"
          style={styles.input}
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          style={styles.input}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>
      <TouchableOpacity
        disabled={loader}
        style={styles.button}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontfamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
});
