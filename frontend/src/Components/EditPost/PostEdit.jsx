import { useEffect, useState } from "react";
import ImagePostEditModal from "./ImagePostEditModal";
import {
  fetchEditPostDetail,
  PostEditPostDetail,
  getOccasion,
  PostEditPostNewImage,
} from "../../Redux/Actions";
import Loading from "../Common/Loading";

const PostEdit = (props) => {
  const [data, setData] = useState();
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [caption, setCaption] = useState("");
  const [occassion, setOccassion] = useState("");
  const [tags, setTags] = useState("");
  const [msg, setErrorMsg] = useState();
  const [mSuccess, setMSucces] = useState();

  const [occasionList, setList] = useState([]);
  const [succes, setSuccess] = useState();
  const [newImage, setNewImage] = useState();
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    fetchEditPostDetail(props.match.params.id, (reply, errorMsg) => {
      if (reply) {
        setData(reply.data);
        setLocation(reply.data[0].location);
        setOccassion(reply.data[0].occassion);
        setDesc(reply.data[0].description);
        setCaption(reply.data[0].caption);
        setTags(reply.data[0].tags);
      } else {
        setErrorMsg(errorMsg);
      }
    });
    getOccasion((reply) => {
      if (reply) {
        setList(reply);
      }
    });
  }, [props.match.params.id]);

  const UpdateData = () => {
    if (typeof tags == "object") {
      var res = tags;
    } else {
      res = tags.split(" ");
    }

    const data = {
      location: location,
      occassion: occassion,
      description: desc,
      caption: caption,
      tags: res,
    };
    PostEditPostDetail(props.match.params, data, (reply, errorMsg) => {
      if (reply) {
        setSuccess("Data Updated");
        fetchEditPostDetail(props.match.params.id, (reply, errorMsg) => {
          if (reply) {
            setData(reply.data);
          } else {
            setErrorMsg(errorMsg);
          }
        });
      } else {
        setErrorMsg(errorMsg);
      }
    });
  };
  const addImage = () => {
    PostEditPostNewImage(props.match.params.id, newImage, (reply, errorMsg) => {
      if (reply) {
        setMSucces("Image Added");
      } else {
        setErrorMsg(errorMsg);
      }
    });
  };

  if (data && !msg) {
    return (
      <div>
        <div className="newPost">
          <div className="card-header">
            <h3 className="text-center">Edit Post</h3>
          </div>
          <div className="card-body">
            <div className="d-flex flex-row form-group mt-2">
              <div className="col-md-6 col-sm-6">
                <label>
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  placeholder="Enter location"
                  className="form-control"
                  required
                />
              </div>
              <div className="ps-2 col-md-6 col-sm-6">
                <label>
                  Select Occasion <span className="text-danger">*</span>
                </label>
                <select
                  onChange={(e) => {
                    setOccassion(e.target.value);
                  }}
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option value="">Choose Occassion</option>
                  {occasionList.map((occ, idx) => {
                    return (
                      <option
                        key={`occ_${idx}`}
                        value={occ}
                        className="text-capitalize"
                      >
                        {occ}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group mt-2">
              <label>
                Caption <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="caption"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                placeholder="Enter caption"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                placeholder="Enter tags"
                className="form-control"
              />
            </div>
            <div className="form-group mt-2">
              <label>Description</label>
              <textarea
                type="text"
                name="desc"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                placeholder="Enter description"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div className="form-group text-center mt-2 d-flex flex-wrap justify-content-around">
              <button onClick={UpdateData} className="btn btn-info">
                Update Post Detail
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#NewPostModalImage"
                className="btn btn-success"
                onMouseEnter={() => setClicked(false)}
              >
                Add Image
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#EditPostModalImage"
                className="ms-4 btn btn-primary"
                onMouseEnter={() => setClicked(true)}
              >
                Edit Image
              </button>
            </div>
          </div>
        </div>
        <h4 className="text-center text-success">{succes ? succes : ""}</h4>
        {isClicked && (
          <ImagePostEditModal
            ModalClicked={(val) => setClicked(val)}
            Clicked={isClicked}
            Id={props.match.params.id}
          />
        )}
        <div
          className="modal fade"
          id="NewPostModalImage"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add image
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form encType="multipart/form-data">
                  <input
                    className="form-control"
                    onChange={(e) => {
                      setNewImage(e.target.files[0]);
                    }}
                    type="file"
                    name="Image"
                    multiple
                    accept="image/*"
                    capture="camera"
                  />
                </form>
              </div>
              <div className="modal-footer">
                <h4 className="text-center text-success">
                  {mSuccess ? mSuccess : ""}
                </h4>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setMSucces("")}
                >
                  Close
                </button>
                <button
                  onClick={addImage}
                  type="button"
                  className="btn btn-primary"
                >
                  Add image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default PostEdit;
