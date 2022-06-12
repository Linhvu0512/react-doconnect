import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Question = ({ title, description, author, image, createdAt, id }) => {
  const navigate = useNavigate();

  return (
    <QuestionContainer>
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="details">
        <h3>{title}</h3>
        <ul className="meta">
          <li>
            Date -
            <span className="colorize">
              {createdAt?.toDate()?.toDateString()}
            </span>
          </li>
          <li>
            Author -<span className="colorize">{author?.name}</span>
          </li>
        </ul>
        <div className="text">
          <p>
            {description?.length > 200
              ? description?.slice(0, 200)
              : description}
            <span
              onClick={() => navigate(`/questionDetails/${id}`)}
              className="cursor-pointer colorize"
            >
              ...Read more
            </span>
          </p>
        </div>
      </div>
    </QuestionContainer>
  );
};
const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.08);
  padding: 0.6rem;
  border-radius: 4px;
  gap: 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .image {
    height: 100%;
    border-radius: 4px;
    width: 500px;
    @media (max-width: 600px) {
      width: 100%;
    }
    img {
      border-radius: 4px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 0.4rem 0rem;
    span {
      font-weight: 500;
    }
  }
  .text {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.6;
    span {
      font-weight: bold;
    }
  }
`;
export default Question;
