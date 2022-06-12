import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { GoTrashcan } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useQuestions from "../../../hooks/useQuestions";
import { auth, db, storage } from "../../Firebase/Firebase.config";
const PostList = () => {
  const [postedQuestions, setPostedQuestions] = useState([]);
  const { questions } = useQuestions();
  const navigate = useNavigate();
  useEffect(() => {
    const currentUserQuestions = questions.filter(
      (question) => question.author.uid === auth.currentUser.uid
    );
    setPostedQuestions(currentUserQuestions);
  }, [questions]);

  /* handle delete doc  */
  const handlePostDelete = async (id, image) => {
    if (window.confirm("Do you want to delete it?")) {
      const deleteDocRef = doc(db, "questions", id);
      await deleteDoc(deleteDocRef);
      const filteredOut = questions.filter((question) => question?.id !== id);
      setPostedQuestions(filteredOut);
      const deleteImageRef = ref(storage, image);
      await deleteObject(deleteImageRef)
        .then(() => {
          toast.success("User Delete Successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section>
      <div className="title">
        <h1>Post List</h1>
        <p>You will see all the post here</p>
      </div>
      <PostListContainer>
        <div className="card">
          <div className="card-header">
            <h2>All Question List</h2>
          </div>
          <div className="card-body">
            {postedQuestions.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Short Description</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {postedQuestions.map((question) => (
                    <tr key={question.id}>
                      <td title={question?.id}>
                        {question?.id.length > 6
                          ? question?.id?.slice(0, 6) + "..."
                          : question.id}
                      </td>
                      <td title={question?.title}>
                        {question?.title.length > 30
                          ? question?.title.slice(0, 30) + "..."
                          : question?.title}
                      </td>
                      <td>
                        {question?.category ? question.category : "Not Available"}
                      </td>
                      <td title={question?.description}>
                        {question?.description.length > 50
                          ? question?.description.slice(0, 50) + "...."
                          : question?.description}
                      </td>
                      <td>
                        <img src={question?.image} alt="" />
                      </td>
                      <td title="Not Available">
                        <span className="disabled">
                          <FiEdit />
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={() =>
                            handlePostDelete(question?.id, question?.image)
                          }
                        >
                          <GoTrashcan />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>
                No Post published yet.{" "}
                <span
                  onClick={() => navigate("/dashboard/create-post")}
                  className="colorize cursor-pointer bold"
                >
                  Create
                </span>
              </p>
            )}
          </div>
        </div>
      </PostListContainer>
    </section>
  );
};

const PostListContainer = styled.div`
  position: relative;
  padding: 4rem;
  .card {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    border-radius: 5px;
    .card-header {
      padding: 1rem;
      background: #f8f8f8;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    .card-body {
      position: relative;
      table {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        th,
        td {
          padding: 0.6rem;
          border-bottom: 1px solid #ccc;
          img {
            width: 70px;
            height: 70px;
            border-radius: 5px;
            object-fit: cover;
          }
          span {
            cursor: pointer;
            font-size: 1.5rem;
            text-align: center;
          }
          &:last-child span {
            color: salmon;
          }
        }
      }
    }
  }
`;
export default PostList;
