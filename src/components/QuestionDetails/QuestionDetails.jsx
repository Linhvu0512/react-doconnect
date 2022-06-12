import React, { useEffect, useState } from "react";
import { BsChevronDoubleLeft } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useQuestions from "../../hooks/useQuestions";
const QuestionDetails = () => {
  const [questionDetails, setQuestionDetails] = useState({});
  const navigate = useNavigate();
  const { QuestionId } = useParams();
  const { questions } = useQuestions();
  useEffect(() => {
    const desireQuestions = questions.find((question) => question.id === QuestionId);
    setQuestionDetails(desireQuestions);
  }, [QuestionId, questions]);

  console.log(QuestionId);
  return (
    <QuestionDetailsContainer>
      <div className="header-overlay">
        <span
          title="Go Back Questions"
          onClick={() => navigate(-1)}
          className="back-btn cursor-pointer"
        >
          <BsChevronDoubleLeft />
        </span>
      </div>
      <div className="container">
        <div className="article-container">
          <div className="image">
            {questionDetails?.image ? (
              <img src={questionDetails?.image} alt="pho" />
            ) : (
              <Skeleton height={320} />
            )}
          </div>
          <div className="details">
            <div className="blog-title">
              <h1>{questionDetails?.title || <Skeleton count={1} />}</h1>
              <ul className="meta">
                {questionDetails ? (
                  <li>
                    Data -
                    <span className="colorize">
                      {questionDetails?.createdAt?.toDate()?.toDateString()}
                    </span>
                  </li>
                ) : (
                  <Skeleton count={1} />
                )}
                {questionDetails ? (
                  <li>
                    Author -
                    <span className="colorize">
                      {questionDetails?.author?.name}
                    </span>
                  </li>
                ) : (
                  <Skeleton count={1} />
                )}
              </ul>
            </div>
            <div className="desc">
              <p>{questionDetails?.description || <Skeleton count={30} />}</p>
            </div>
          </div>
        </div>
      </div>
    </QuestionDetailsContainer>
  );
};
const QuestionDetailsContainer = styled.section`
  position: relative;
  padding: 0rem;
  .header-overlay {
    position: relative;
    width: 100%;
    padding: 9rem 0rem;
    background: var(--main-color);
    .back-btn {
      position: absolute;
      color: var(--accent-color);
      font-size: 1.4rem;
      left: 20px;
      top: 5%;
    }
  }
  .article-container {
    position: relative;
    padding: 1rem;
    .image {
      text-align: center;
      width: 600px;
      height: 350px;
      border: 10px solid var(--accent-color);
      margin: -12rem auto;
      z-index: 50;
      position: relative;
      border-radius: 5px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
      background: #fff;
      @media (max-width: 700px) {
        width: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .details {
      margin-top: 14rem;
      text-align: center;
      position: relative;

      .blog-title {
        margin: 1rem 0rem;
        .meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin: 1rem 0rem;
          span {
            font-weight: bold;
          }
        }
      }
      .desc {
        text-align: justify;
        margin: 2rem 0rem;
        font-size: 1.1em;
        line-height: 1.7;
        padding: 0rem 8em;
        @media (max-width: 700px) {
          padding: 0rem 1em;
        }
      }
    }
  }
`;
export default QuestionDetails;
