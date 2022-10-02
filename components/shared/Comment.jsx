import { useState } from "react";

const Comment = ({ item, margin }) => {
  const [showForm, setShowForm] = useState(false);
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
    item.children.push(state);
    setShowForm(false);
  };

  const handleClick = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div style={{ marginLeft: `${margin}px`, width: "100%" }}>
      <div className="child_comment ">
        <p>
          UserName: <span className="comment_text">{item.username}</span>{" "}
        </p>
        <p>
          Comment: <span className="comment_text">{item.comment}</span>
        </p>
        <button
          className="ml-2 mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => {
            handleClick();
          }}
        >
          Reply
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="m_auto">
          <div className="flex items-center justify-around ">
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
              <label htmlFor="name">Description</label>
              <input
                className="input"
                id="comment"
                placeholder="Comment"
                name="comment"
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="ml-2 mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Comment
          </button>
        </form>
      )}
      {item.children.length
        ? item.children.map((e, i) => {
            let oldM = margin;
            oldM += 15;
            return <Comment item={e} key={i} margin={oldM} />;
          })
        : null}
    </div>
  );
};

export default Comment;
