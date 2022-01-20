import Post from "./Post";

console.log();
const Posts = ({
  posts,
  onClick,
  onDeletePost,
  onOpenModal,
  modal,
  setSelectedPostId,
}) => {
  return (
    <>
      {posts.map((post) => (
        <Post
          post={post}
          onClick={onClick}
          onDeletePost={onDeletePost}
          modal={modal}
          setSelectedPostId={setSelectedPostId}
          onOpenModal={onOpenModal}
        />
      ))}
    </>
  );
};

export default Posts;
