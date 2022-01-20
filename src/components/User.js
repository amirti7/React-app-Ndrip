import { FaTimes } from "react-icons/fa";

const style = { color: "red", cursor: "pointer", float: "right" };

const User = ({ user, onDelete, onClick }) => {
  const { id, email, companyName, name, coordinates, userName } = user;

  return (
    <div className="user" onDoubleClick={() => onClick(id)}>
      <h3>
        {name},"{userName}"{" "}
        <FaTimes style={style} onClick={() => onDelete(id)} />
      </h3>
      <p>{email}</p>

      {/* <Link to={`https://maps.google.com/?q=${coordinates}`}>
            
          {coordinates}
        </Link> */}
      <a href={`https://maps.google.com/?q=${coordinates}`}>{coordinates}</a>
      <p>{companyName}</p>
    </div>
  );
};

export default User;
