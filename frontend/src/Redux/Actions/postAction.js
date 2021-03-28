import { base_url } from "../config";
import axios from "axios";

export const likePost = (postId, callback) => {
  try {
    axios
      .get(`${base_url}/like/manageLike/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const getComment = (postId, callback) => {
  try {
    axios
      .get(`${base_url}/comment/getComments/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const getRatings = (postId, callback) => {
  try {
    axios
      .get(`${base_url}/rating/getRatings/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const addNewComment = (postId, comment, callback) => {
  try {
    axios
      .post(
        `${base_url}/comment/addComment/${postId}`,
        {
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const addNewRating = (postId, rating, callback) => {
  try {
    axios
      .get(`${base_url}/rating/addRating/${postId}?rating=${rating}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false, reply.data.message);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const savePost = (postId, callback) => {
  try {
    axios
      .get(`${base_url}/save/manageSave/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false, reply.data.message);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const fetchEditPostDetail = (id, callback) => {
  try {
    axios
      .get(`${base_url}/post/getPostDetail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
export const AddNewPostDetail = (Data, callback) => {
  try {
    axios
      .post(
        `${base_url}/post/addPost`,
        {
          location: Data.location,
          occassion: Data.occassion,
          description: Data.description,
          caption: Data.caption,
          tags: Data.tags,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};

export const PostEditPostDetail = (id, Data, callback) => {
  try {
    axios
      .post(
        `${base_url}/post/updatePost/${id.id}`,
        {
          location: Data.location,
          occassion: Data.occassion,
          description: Data.description,
          caption: Data.caption,
          tags: Data.tags,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
export const fetchEditPostImage = (id, callback) => {
  try {
    axios
      .get(`${base_url}/image/getImages/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
export const PostEditPostImage = (id, Data, callback) => {
  try {
    const data = new FormData();
    data.append("imageFile", Data);
    data.append("imageId", id);
    const header = {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    axios
      .post(`${base_url}/image/updateImage`, data, header)
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
export const PostEditPostNewImage = (id, Data, callback) => {
  try {
    const data = new FormData();
    data.append("imageFile", Data);
    data.append("postId", id);
    data.append("isImage", true);
    const header = {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    axios
      .post(`${base_url}/image/addImage`, data, header)
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
export const PostEditPostDeleteImage = (id, callback) => {
  try {
    axios
      .post(
        `${base_url}/image/deleteImage`,
        { imageId: id },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      )
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
export const PostDelete = (id, callback) => {
  try {
    axios
      .get(`${base_url}/post/deletePost/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((reply) => {
        if (reply.data.status === 200) {
          callback(reply.data);
        } else {
          callback(false);
        }
      })
      .catch(() => callback(false));
  } catch (error) {
    callback(false);
  }
};
