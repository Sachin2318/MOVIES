import { useState } from "react";
import Comment from "./Comment";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let state = {
      ...formState,
      children: [],
    };
    const ary = [...comments, ...[state]];
    setComments(ary);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            className="input"
            id="username"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Comments</label>
          <textarea
            className="input"
            id="comment"
            placeholder="Comment"
            name="comment"
            style={{ width: "100%", height: "100px" }}
            onChange={handleChange}
          />
        </div>

        <button className="ml-2 mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add Comment
        </button>
      </form>
      <div style={{ width: "100%" }}>
        {comments.map((comment, idx) => {
          return (
            <Comment
              key={idx}
              item={comment}
              setComments={setComments}
              margin={0}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comments;
