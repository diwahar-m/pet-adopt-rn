import { useLocalSearchParams, useNavigation } from "expo-router";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const params = useLocalSearchParams();
  console.log(params);
  const navigation = useNavigation();
  const { user } = useUser();

  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);
    const otherUser = result?.users?.filter(
      (item) => item.email != user?.primaryEmailAddress?.emailAddress
    );
    // setting other user as header name
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };

  const onSend = async (newMessage) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, newMessage)
    );
    await addDoc(collection(db, "Chat", params?.id, "Messages"), newMessage[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => this.onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
