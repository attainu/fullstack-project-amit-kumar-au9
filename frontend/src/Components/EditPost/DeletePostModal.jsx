import { useState } from "react";
import { PostDelete } from "../../Redux/Actions";
const DeletePostModal = (props) => {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const deletePost = () => {
    PostDelete(props.Id, (reply, errorMsg) => {
      if (reply) {
        setMsg("Post deleted");
      } else {
        setErr(errorMsg);
      }
    });
  };
  if (!err) {
    return (
      <div
        className="modal fade"
        id="DeletePostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.ModalClicked(false)}
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => props.ModalClicked(false)}
              >
                Close
              </button>
              <button
                onClick={deletePost}
                type="button"
                className="btn btn-primary ms-5"
              >
                Confirm
              </button>
            </div>
            <div className="card-footer text-center text-danger">
              {msg ? msg : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default DeletePostModal;
