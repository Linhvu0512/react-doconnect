import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Asidebar from "./Asidebar/Asidebar";
const Dashboard = () => {
  return (
    <DashboardContainer>
      <div className="dashboard-container">
        <Asidebar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.section`
  position: relative;
  .dashboard-container {
    position: relative;
    aside {
      position: fixed;
      inset: 0;
      max-width: 300px;
      height: 100%;
      background-color: var(--main-color);
      z-index: 3;
    }
    .dashboard-content {
      position: relative;
      width: calc(100% - 350px);
      left: 300px;
      margin-left: 1rem;
    }
  }
`;

export default Dashboard;
