import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import ProfilePostCard from "../components/ProfilePostCard";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import Info from "../components/Info";

export default function Profile() {
  const { email } = useParams();

  // Query<DocumentData> object for fetching posts that belong to the respective users
  const q = query(
    collection(db, "posts"),
    where("email", "==", email),
    orderBy("id", "desc")
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetching data in realtime
    onSnapshot(q, (res) => {
      setPosts(res.docs.map((post) => post.data()));
    });
  }, [email]);

  return (
    <div id="profile" className="flex flex-col items-center justify-center">
      <Info />

      <div className="max-w-[890px] flex flex-wrap items-center justify-center">
        {posts.map((val, id) => {
          return <ProfilePostCard key={id} {...val} />;
        })}
      </div>

      {
        // shown when no posts found in database
        posts.length == 0 ? (
          <div className="flex flex-col min-h-[calc(100vh-343px)] items-center justify-center">
            <i className="border-2 text-4xl p-10 border-gray-800 rounded-full fa-solid fa-camera"></i>
            <h2 className="font-bold text-2xl m-2">No Posts Yet !</h2>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
}
