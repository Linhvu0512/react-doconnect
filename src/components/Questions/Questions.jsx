import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useQuestions from "../../hooks/useQuestions";
import Question from "../Question/Question";
import { auth } from "../Firebase/Firebase.config";
import Loader from "../Loader/Loader";
const Questions = () => {
  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const { questions, loading } = useQuestions();
  const navigate = useNavigate();
  useEffect(() => {
    setSearchedQuestions(questions);
  }, [questions]);

  const handleSearch = () => {
    const filterQuestions = questions.filter((question) =>
    question?.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedQuestions(filterQuestions);
  };

  return (
    <section id="articles">
      <div className="container">
        <SectionTitle>
          <div className="title">
            <h1>Read Question</h1>
            <p>read & create questions create greatest artist only.</p>
          </div>
          <div className="search">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              value={search}
              placeholder="Search question"
            />
            <button onClick={handleSearch}>
              <BsSearch />
            </button>
          </div>
        </SectionTitle>

        {loading ? (
          searchedQuestions.length > 0 ? (
            <QuestionsContainer>
              {searchedQuestions.map((question) => (
                <Question key={question.id} {...question} />
              ))}
            </QuestionsContainer>
          ) : (
            <>
              <NotFoundQuestions>
                <img
                  src="https://cdn.dribbble.com/users/2939235/screenshots/7895570/media/a514579499752bed80ba8280eee7cd48.jpg?compress=1&resize=400x300"
                  alt=""
                />
                <h2>There is no Questions Yet</h2>
                {auth?.currentUser?.uid ? (
                  <button
                    className="btn"
                    onClick={() => navigate("/dashboard/create-post")}
                  >
                    Create Your First
                  </button>
                ) : (
                  <button className="btn" onClick={() => navigate("/login")}>
                    Login & Publish Questions
                  </button>
                )}
              </NotFoundQuestions>
            </>
          )
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
const SectionTitle = styled.div`
  padding: 0.5rem 1rem;
  position: relative;
  background: #f8f8f8;
  border-radius: 4px;
  margin: 1rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .search {
    display: flex;
    align-items: stretch;
    background-color: var(--accent-color);
    padding: 0.4rem;
    width: min(100% - 2rem, 400px);
    input {
      border: none;
      outline: none;
      font-size: 1rem;
      font-family: var(--fonts);
      padding: 0.6rem;
      width: 100%;
    }
    button {
      padding: 0rem 1.2rem;
      border: none;
      outline: none;
      background-color: var(--main-color);
      color: var(--accent-color);
      cursor: pointer;
    }
  }
`;

const QuestionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  position: relative;
  grid-gap: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const NotFoundQuestions = styled.div`
  text-align: center;
  padding: 3rem 0rem;
  position: relative;
  button {
    margin: 1rem 0rem;
  }
`;
export default Questions;
