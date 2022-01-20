import { useEffect, useState } from "react";
import Header from "./components/Header";
import Users from "./components/Users";
import Posts from "./components/Posts";
import EditModal from "./components/EditModal";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(
    +localStorage.getItem("selectedUserId") || undefined
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState();
  const [titleValue, setTitleValue] = useState();
  const [bodyValue, setBodyValue] = useState();

  useEffect(() => {
    async function getUsers() {
      const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
      if (usersFromLocalStorage) {
        setUsers(usersFromLocalStorage);
      } else {
        const usersFromServer = await fetchUsers();
        setUsers(usersFromServer);
      }
    }
    getUsers();
  }, []);

  //fetch data
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    return data;
  };

  //delete user
  function deleteUser(id) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers([...updatedUsers]);
    saveDataToLocalStorage(updatedUsers);
  }

  //delete post
  function deletePost(id) {
    //old user data
    const user = users.find((user) => user.id === selectedUserId);
    const userPosts = user.posts;
    //updated posts
    const postIndex = userPosts.findIndex(function (post) {
      return post.id === id;
    });
    const updatedPosts = [...userPosts];
    updatedPosts.splice(postIndex, 1);
    //updated user
    const updatedUser = { ...user, posts: updatedPosts };
    //updated users
    const index = users.findIndex(function (user) {
      return user.id === selectedUserId;
    });
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1, updatedUser);
    setUsers(updatedUsers);
    saveDataToLocalStorage(updatedUsers);
  }

  //edit post
  function editPost() {
    const userIndex = users.findIndex((user) => user.id === selectedUserId);
    const postIndex = selectedUserPosts.findIndex(
      (post) => post.id === selectedPostId
    );
    //update post
    const postToEdit = users[userIndex].posts[postIndex];
    postToEdit.title = titleValue || selectedPost.title;
    postToEdit.body = bodyValue || selectedPost.body;
    //update user
    const user = users.find((user) => user.id === selectedUserId);
    const userPosts = user.posts;
    userPosts.splice(postIndex, 1, postToEdit);
    //update users
    const updatedUsers = [...users];
    updatedUsers.splice(userIndex, 1, user);
    setUsers(updatedUsers);
    saveDataToLocalStorage(updatedUsers);
    setModalIsOpen(false);
    setBodyValue();
    setTitleValue();
  }

  //show posts
  function handleSelectUser(id) {
    setSelectedUserId(id);
    window.localStorage.setItem("selectedUserId", id);
  }

  function saveDataToLocalStorage(users) {
    window.localStorage.setItem("users", JSON.stringify(users));
  }

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const selectedUserPosts = selectedUser?.posts || [];
  const selectedPost = selectedUserPosts.find(
    (post) => post.id === selectedPostId
  );

  const NO_USERS_TO_DISPLAY = users.length > 0;
  return (
    <div className="container">
      <Header title="Users" />
      {NO_USERS_TO_DISPLAY ? (
        <Users
          users={users}
          handleSelectUser={handleSelectUser}
          onDelete={deleteUser}
        />
      ) : (
        "No Users To Display"
      )}
      <div className="posts">
        <Header title="Posts" />
        <Posts
          posts={selectedUserPosts}
          onDeletePost={deletePost}
          setSelectedPostId={setSelectedPostId}
          onOpenModal={setModalIsOpen}
          modal={modalIsOpen}
        />
      </div>
      {selectedPost ? (
        <EditModal
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          bodyValue={bodyValue}
          setBodyValue={setBodyValue}
          selectedPost={selectedPost}
          editPost={editPost}
        ></EditModal>
      ) : null}
    </div>
  );
}

export default App;
