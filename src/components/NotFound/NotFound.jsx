import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer onClick={() => navigate("/")}>
      <img
        src="https://colorlib.com/cdn-cgi/image/quality=80,format=auto,onerror=redirect,metadata=none/wp/wp-content/uploads/sites/2/404-error-template-3.png"
        alt="not-found page"
      />
    </NotFoundContainer>
  );
};
const NotFoundContainer = styled.section`
  text-align: center;
  cursor: pointer;
  max-height: 90vh;
  overflow: hidden;
`;
export default NotFound;
