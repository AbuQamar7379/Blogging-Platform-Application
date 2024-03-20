import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import "../AUTH/Register/Register.css";
import { config } from "../../App";

function PostBlog() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: {
      fullName: "",
      email: "",
    },
    image: "",
    content: "",
  });
  let userId = localStorage.getItem("userId");

  const getUser = async () => {
    try {
      let response = await axios.get(
        `${config.endpoint}/auth/getUser/${userId}`
      );

      setFormData((prev) => ({
        ...prev,
        author: {
          fullName: response?.data?.name,
          email: response?.data?.email,
        },
      }));
      console.log(response.data, "USER");
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(formData, "FORM");

  const handleInputUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const postBlog = async () => {
    try {
      let token = localStorage.getItem("token");
      setIsLoading(true);
      const data = {
        title: formData.title,
        author: formData.author,
        image: formData.image,
        content: formData.content,
      };
      const res = await fetch(`${config.endpoint}/blog/new`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "res");

      if (res.status === 201) {
        enqueueSnackbar("Blog posted successfully", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar("Failed to post blog", { variant: "error" });
      }
    } catch (error) {
      console.log(error.response, "err");
      if (error?.response?.data?.message)
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });

      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="login_body">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Post Blog</h2>
              <p className="text-white-50 mb-5">
                Please enter the required credentials to post the blog
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                color="white"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="title"
                label="title"
                id="formControlLg"
                type="text"
                size="lg"
                required
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="image"
                label="Image Link"
                id="formControlLg"
                type="text"
                size="lg"
                required
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                className="form-input"
                onChange={(e) => handleInputUpdate(e)}
                name="content"
                label="Content"
                id="formControlLg"
                type="text"
                size="lg"
                required
              />

              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={postBlog}
              >
                Post
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default PostBlog;
