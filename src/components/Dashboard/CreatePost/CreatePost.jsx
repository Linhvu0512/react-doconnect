import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { v4 } from "uuid";
import { auth, db, storage } from "../../Firebase/Firebase.config";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(null);
  const [imageField, setImageField] = useState(false);

  const formRef = useRef(null);

  const handleAddQuestionOnDatabase = (event) => {
    event.preventDefault();
    if (!title) return toast.error("Title Field is required.");
    if (!category) return toast.error("Category field is required.");
    if (!description) return toast.error("Descriptions field is required.");

    if (image.name) {
      if (!image.name) return toast.error("Featured Image is required.");
      const imageRef = ref(
        storage,
        `/questions/images/${new Date() + image.name}`
      );
      const uploadImage = uploadBytesResumable(imageRef, image);
      uploadImage.on(
        "state_changed",
        (snapShot) => {
          const progressPercent = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (err) => {
          toast.error(err.message);
        },
        () => {
          formRef.current.reset();
          setProgress(null);
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const questionRef = collection(db, "/questions");
            addDoc(questionRef, {
              id: v4(),
              title,
              category,
              description,
              image: url,
              author: {
                name: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
              },
              createdAt: Timestamp.now().toDate(),
            }).then(() => {
              toast.success("Questions submit successfully.");
            });
          });
        }
      );
    } else if (imageUrl) {
      if (!imageUrl) return toast.error("Featured Image is required.");
      const questionRef = collection(db, "/questions");
      addDoc(questionRef, {
        id: v4(),
        title,
        category,
        description,
        image: imageUrl,
        author: {
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
        },
        createdAt: Timestamp.now().toDate(),
      }).then(() => {
        formRef.current.reset();
        toast.success("Questions submit successfully.");
      });
    }
  };

  return (
    <section>
      <div className="title">
        <h1>Create Question</h1>
        <p>you will create question here</p>
      </div>
      <CreatePostContainer>
        <div className="card">
          <div className="card-header">
            <h2>Create a Question new post</h2>
          </div>
          <div className="card-body">
            <form
              action="#"
              ref={formRef}
              onSubmit={handleAddQuestionOnDatabase}
            >
              <div className="input-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  onBlur={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Category"
                  onBlur={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="desc">Description</label>
                <textarea
                  name="desc"
                  id="desc"
                  cols="30"
                  rows="10"
                  placeholder="Post Description"
                  onBlur={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="input-group">
                <label>
                  Upload Post Image
                  <small
                    className="url-btn cursor-pointer"
                    onClick={() => setImageField((prev) => !prev)}
                  >
                    {imageField ? "Upload" : "URL"}
                  </small>
                </label>
                {imageField ? (
                  <input
                    type="url"
                    name="url"
                    id="url"
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Put your image URL"
                  />
                ) : (
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                )}
              </div>
              {progress && (
                <div className="input-group">
                  <div className="progress">
                    <div
                      className="progressbar"
                      style={{ width: `${progress}%` }}
                    >
                      <small>{progress}%</small>
                    </div>
                  </div>
                </div>
              )}

              <div className="input-group">
                {/* <label htmlFor="button">Action</label> */}
                <button type="submit" className="btn">
                  Submit Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </CreatePostContainer>
    </section>
  );
};

const CreatePostContainer = styled.div`
  position: relative;
  padding: 4rem;
  @media (max-width: 1000px) {
    padding: 1rem;
  }
  .card {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    border-radius: 5px;
    @media (max-width: 1000px) {
      padding: 1rem;
    }
    .card-header {
      padding: 1rem;
      background: #f8f8f8;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    .card-body {
      padding: 1rem;
      position: relative;
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .input-group {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        position: relative;
        flex-wrap: wrap;
        gap: 0.5rem;
        .url-btn {
          background: var(--main-color);
          color: var(--accent-color);
          margin: 0rem 0.3rem;
          padding: 0.2rem;
          border-radius: 4px;
        }
        .progress {
          position: relative;
          width: 80%;
          height: 4px;
          background: #f8f8f8;
          margin-left: auto;
          .progressbar {
            position: absolute;
            height: 100%;
            inset: 0;
            background-color: var(--main-color);
          }
        }
        input,
        textarea {
          width: 80%;
          padding: 1rem;
          font-size: 1.1rem;
          font-family: var(--fonts);
          border: 2px solid #ccc;
          outline: none;
          border-radius: 5px;
          @media (max-width: 1000px) {
            width: 100%;
          }
          &:focus {
            border: 2px solid var(--main-color);
          }
        }
      }
    }
  }
`;
