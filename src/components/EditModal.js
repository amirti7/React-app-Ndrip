import { useRef } from "react";
import Modal from "react-modal/lib/components/Modal";

const style = {
  overlay: {
    width: "40%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    textAlign: "center",
  },
};
const EditModal = ({
  titleValue,
  setTitleValue,
  bodyValue,
  setBodyValue,
  editPost,
  modalIsOpen,
  setModalIsOpen,
  selectedPost,
}) => {
  const myRefs = useRef([]);

  function handleEnterKeyPress(e, targetElem) {
    if (e.key === "Enter" && targetElem) {
      targetElem.focus();
    }
  }

  function onCloseModal() {
    setModalIsOpen(false);
    setBodyValue();
    setTitleValue();
  }
  return (
    <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} style={style}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "50%",
          margin: "auto",
        }}
      >
        <h2 style={{ "text-align": "center" }}>Edit Post</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>Title: </label>
          <input
            onKeyUp={(e) => handleEnterKeyPress(e, myRefs.current[1])}
            ref={(el) => (myRefs.current[0] = el)}
            onChange={(e) => setTitleValue(e.target.value)}
            type="text"
            id="title"
            value={titleValue || selectedPost.title}
          ></input>
        </div>
        <div>
          <label>Body: </label>
          <input
            onKeyUp={(e) => handleEnterKeyPress(e, myRefs.current[0])}
            ref={(el) => (myRefs.current[1] = el)}
            onChange={(e) => setBodyValue(e.target.value)}
            type="text"
            id="body"
            value={bodyValue || selectedPost.body}
          ></input>
        </div>
        <button style={{}} className="btn" onClick={editPost}>
          Update
        </button>
        <button style={{}} className="btn" onClick={onCloseModal}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
