import { useEffect, useState } from "react";
import { GlobalStates } from "../context";
import { onValue, ref } from "firebase/database";
import { docDb } from "../firebaseConfig";

export default function AllChats() {
  const { user } = GlobalStates();

  const email = user.email.split("@")[0];

  const [chattingUsers, setChattingUsers] = useState();

  useEffect(() => {
    const dbRef = ref(docDb, `chatting_users/${email}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const chatting_ids = Object.values(data);
        setChattingUsers(chatting_ids);
      }
    });
  }, []);

  return <div id="allchats"></div>;
}
