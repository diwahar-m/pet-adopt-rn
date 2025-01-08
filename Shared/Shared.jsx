import { doc, getDoc, setDoc } from "firebase/firestore";

const GetFavList = async (user) => {
  const docSnap = await getDoc(
    doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress)
  );
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(
      doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress, {
        email: user?.primaryEmailAddress?.emailAddress,
        favorites: [],
      })
    );
  }
};
export default { GetFavList };
