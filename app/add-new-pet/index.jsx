import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
  }, []);

  const handleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for adoption
      </Text>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
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
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
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
      <TouchableOpacity style={styles.button}>
        <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
          Submit
        </Text>
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
  },
});
