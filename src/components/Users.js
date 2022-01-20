import User from "./User";
const Users = ({ users, onDelete, handleSelectUser, onDeletePost }) => {
  return (
    <>
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onDelete={onDelete}
          onClick={handleSelectUser}
          onDeletePost={onDeletePost}
        />
      ))}
    </>
  );
};

export default Users;
