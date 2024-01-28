import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, docDb } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const context = createContext();

export default function Context({ children }) {
  const [user, setUser] = useState(null);
  const [appUsers, setAppUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // function for fetching all app users from realtime database in real time
  const getAppUsers = async () => {
    const dbRef = ref(docDb, "users");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setAppUsers(Object.values(data));
    });
  };

  useEffect(() => {
    // checking if user exists and then performing the following tasks
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        // storing user info in reatime database
        fetch(
          `https://iron-envelope-379712-default-rtdb.firebaseio.com/users/${
            user.email.split("@")[0]
          }.json`,
          {
            method: "PUT",
            headers: {
              "Content-type": "applciation/json",
            },
            body: JSON.stringify({
              email: user.email.split("@")[0],
              photo: user.photoURL,
              uid: user.uid,
            }),
          }
        );

        getAppUsers();

        // fetching posts in real time (firestore)
        const q = query(collection(db, "posts"), orderBy("id", "desc"));
        onSnapshot(q, (res) => {
          setPosts(res.docs.map((post) => post.data()));
        });
      } else setUser(null);
    });
  }, []);

  return (
    <context.Provider value={{ user, appUsers, posts }}>
      {children}
    </context.Provider>
  );
}

export const GlobalStates = () => useContext(context);
