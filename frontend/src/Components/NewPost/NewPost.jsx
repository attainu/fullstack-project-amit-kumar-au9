import { useEffect, useState } from "react";
import { AddNewPostDetail, getOccasion } from "../../Redux/Actions";
const PostEdit = (props) => {
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [caption, setCaption] = useState("");
  const [occassion, setOccassion] = useState("");
  const [tags, setTags] = useState("");
  const [msg, setErrorMsg] = useState();
  const [occasionList, setList] = useState([]);

  useEffect(() => {
    getOccasion((reply) => {
      if (reply) {
        setList(reply);
      }
    });
  });

  const UpdateData = () => {
    if (tags) {
      var res = tags.split(" ");
    } else {
      res = [];
    }
    const data = {
      location: location,
      occassion: occassion,
      description: desc,
      caption: caption,
      tags: res,
    };
    AddNewPostDetail(data, (reply, errorMsg) => {
      if (reply) {
        props.history.push(
          `/newpost/image/${reply.data._id}?Post&Detail&Added`
        );
      } else {
        setErrorMsg(errorMsg);
      }
    });
  };
  if (!msg) {
    return (
      <>
        <div className="newPost">
          <div className="card-header">
            <h3 className="text-center">New Post</h3>
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
            <div className="form-group text-center mt-2">
              <button onClick={UpdateData} className="btn">
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PostEdit;
