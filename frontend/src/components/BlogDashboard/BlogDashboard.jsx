import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import styles from "./BlogDashboard.module.css";
import { config } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export default function Register() {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [inputComment, setInputComment] = useState({
    blogId: "",
    comment: "",
  });
  const [updateComm, setUpdateComm] = useState("");
  const [show, setShow] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const handleComment = (e) => {
    setInputComment((prev) => ({
      ...prev,
      blogId: e.target.id,
      comment: e.target.value,
    }));
  };

  const postComment = async () => {
    try {
      let res = await fetch(`${config.endpoint}/comment/add`, {
        method: "POST",
        body: JSON.stringify(inputComment),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.status === 201) {
        enqueueSnackbar("Comment posted", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
      setInputComment({ blogId: "", comment: "" });
    } catch (err) {
      console.log(err.response);
      enqueueSnackbar(
        "Failed to post comment" +
          " (" +
          err.response.status +
          ") " +
          err.response.statusText,
        {
          variant: "error",
          autoHideDuration: 2000,
        }
      );
    }
  };

  const showComment = async (blogId) => {
    try {
      let res = await axios.get(
        `${config.endpoint}/comment/getComments/${blogId}`
      );
      setCommentsData(res.data);
      setCommentsLoaded(true);
    } catch (err) {
      enqueueSnackbar(
        "Failed to fetch comments",
        +" (" + err.response.status + ") " + err.response.statusText
      );
    }
  };

  const updateComment = async (commentId) => {
    setInputDisabled(!inputDisabled);
    if (updateComm) {
      try {
        let res = await fetch(`${config.endpoint}`);
      } catch (err) {
        enqueueSnackbar(
          "Failed to update comments",
          +" (" + err.response.status + ") " + err.response.statusText
        );
      }
    }
  };

  const fetchBlog = async () => {
    try {
      let response = await axios.get(`${config.endpoint}/blog/getAll`);
      setBlogs(response.data);
    } catch (err) {
      enqueueSnackbar(
        "Failed to fetch Blogs" +
          " (" +
          err.response.status +
          ") " +
          err.response.statusText,
        {
          variant: "error",
          autoHideDuration: 2000,
        }
      );
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <section className={styles.gradient}>
      <div className="d-flex justify-content-end">
        {isLoggedIn ? (
          <Link
            className="btn btn-secondary mx-2 mt-3"
            to={isLoggedIn ? "/post" : "/login"}
          >
            Post Blog
          </Link>
        ) : (
          <Link className="btn btn-secondary mx-2 mt-3 " to={"/register"}>
            {" "}
            Sign Up
          </Link>
        )}
        {isLoggedIn ? (
          <Link
            className="btn btn-danger mx-2 mt-3"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </Link>
        ) : (
          <Link className="btn btn-success mx-2 mt-3" to={"/login"}>
            Login
          </Link>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <h3 className="text-white">Blogging Platform Application</h3>
      </div>
      {!blogs.length ? (
        <div className="d-flex align-items-center justify-content-center h-50 text-white">
          <h2>No Blogs Found!</h2>
        </div>
      ) : (
        <MDBContainer className="pt-3">
          {blogs?.map((blog) => {
            return (
              <MDBCard className="mb-4" key={blog._id}>
                <MDBCardBody className="p-4 text-black">
                  <div className="pt-1 pb-2">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      width={"200px"}
                      height={"200px"}
                    />
                    <div className="d-flex justify-content-between">
                      <h2 className="mt-2">{blog.title}</h2>
                      <p>Posted By {blog.author.fullName}</p>
                    </div>
                    <h4>{blog.content}</h4>
                    <div className="mt-3 d-flex align-items-center">
                      <input
                        type="text"
                        name="comment"
                        id={blog._id}
                        className={styles.comment}
                        placeholder="Add a comment..."
                        value={inputComment.comment}
                        onChange={handleComment}
                        disabled={inputDisabled} // Set disabled attribute based on state
                      />
                      <span
                        className="btn btn-primary p-1 mx-1"
                        onClick={postComment}
                      >
                        post
                      </span>
                    </div>
                    <div className="mt-2 text-primary mb-0 cursor-pointer">
                      <span
                        onClick={async () => {
                          setShow(!show);
                          if (!commentsLoaded) {
                            await showComment(blog._id);
                          }
                        }}
                      >
                        {show ? "Hide Comments" : "Show Comments"}
                      </span>
                      <ul
                        style={{ listStyleType: "none" }}
                        className={!show && "d-none"}
                      >
                        {commentsData?.map((comment) => {
                          return (
                            <li key={comment._id} className="mb-2 ">
                              <input
                                type="text"
                                disabled={!inputDisabled} // Toggle disable based on inputDisabled state
                                id={comment._id}
                                value={comment.comment}
                                onChange={(e) => setUpdateComm(e.target.value)}
                                style={{
                                  border: inputDisabled
                                    ? "1px solid black"
                                    : "none",
                                  backgroundColor: "white",
                                }}
                              />
                              <span
                                className="btn btn-primary p-1 mx-1"
                                onClick={() => updateComment(comment._id)}
                              >
                                {inputDisabled ? "Save" : "Edit"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            );
          })}
        </MDBContainer>
      )}
    </section>
  );
}
