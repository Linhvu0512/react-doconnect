import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <img
        src="https://i.pinimg.com/originals/49/23/29/492329d446c422b0483677d0318ab4fa.gif"
        alt="loader"
      />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  text-align: center;
`;

export default Loader;
