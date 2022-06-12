import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeContainer>
      <div className="container">
        <div className="blog-container">
          <div className="blog-text">
            <h3>Welcome to my Blog</h3>
            <h1>
              Read Blog <span className="colorize">Gether Knowledge</span>
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae magni laborum porro aliquam illo rerum itaque inventore, asperiores, unde corrupti omnis dolorem delectus earum quisquam repudiandae, perferendis perspiciatis obcaecati consequuntur?
            </p>
            <button className="btn">Read Blogs</button>
          </div>
          <div className="blog-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-YJ4XS4l-5lo3o9z18TcTiG9uCLqn3eJBnO5v6xiuICiO9Sfjr0Jf_6QQAry-gHHwdWA&usqp=CAU"
              alt=""
            />
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};
const HomeContainer = styled.section`
  position: relative;
  .blog-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 90vh;
    gap: 2rem;
    @media (max-width: 600px) {
      flex-direction: column;
      text-align: center;
    }
    .blog-text {
      flex: 1;
      @media (max-width: 600px) {
        order: 2;
        h3 {
          font-size: 1rem;
        }
      }
      h1 {
        font-size: 4rem;
        font-weight: 800;
        @media (max-width: 1100px) {
          font-size: 2rem;
        }
      }
      p {
        line-height: 1.7;
        margin: 1rem 0rem;
        font-size: 1rem;
      }
    }
    .blog-image {
      flex: 1;
      @media (max-width: 600px) {
        order: 1;
      }
      img {
        width: 80%;
        @media (max-width: 600px) {
          width: 100%;
        }
      }
    }
  }
`;
export default Home;
