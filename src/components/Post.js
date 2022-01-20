import { FaTimes } from "react-icons/fa";

const style = { color: "red", cursor: "pointer", float: "right" };

const Post = ({
  post,
  onDeletePost,
  onOpenModal,
  modal,
  setSelectedPostId,
}) => {
  function onClickPost() {
    onOpenModal(!modal);
    setSelectedPostId(post.id);
  }
  const { id, title, body } = post;
  return (
    <div onDoubleClick={() => onClickPost()} className="post">
      <h3>
        {title} <FaTimes style={style} onClick={() => onDeletePost(id)} />{" "}
      </h3>
      <p>{body}</p>
    </div>
  );
};

export default Post;
