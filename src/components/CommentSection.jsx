export default function CommentSection({ comments }) {
  return (
    <div
      id="commentsection"
      className="border bg-white rounded-md m-2 p-2 w-[360px] md:w-[700px] h-96 overflow-x-hidden overflow-y-auto"
    >
      {comments.map((commentObj, id) => {
        return (
          <p key={id} className="p-2">
            <span className="font-medium pr-3">{commentObj.email}</span>
            <span className="text-slate-500">{commentObj.userComment}</span>
          </p>
        );
      })}
    </div>
  );
}
