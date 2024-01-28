import PostCard from "../components/PostCard";
import AppUsers from "../components/AppUsers";
import { GlobalStates } from "../context";

export default function Posts() {
  const { posts } = GlobalStates();

  return (
    <div id="posts" className="flex flex-wrap items-center justify-center">
      <AppUsers />

      {
        // shown when no posts found in database
        posts.length == 0 ? (
          <div className="flex flex-col min-h-[calc(100vh-57.6px)] items-center justify-center">
            <i className="border-2 text-4xl p-10 border-gray-800 rounded-full fa-solid fa-camera"></i>
            <h2 className="font-bold text-2xl m-2">No Posts Yet !</h2>
          </div>
        ) : (
          ""
        )
      }

      {
        // rendering all the posts
        posts.map((val, id) => {
          return <PostCard key={id} {...val} />;
        })
      }
    </div>
  );
}
