import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { BsCardChecklist, BsChevronDoubleLeft } from "react-icons/bs";
import { FaGripfire } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import { auth } from "../../Firebase/Firebase.config";
const Asidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      toast.success("Log Out successfully!");
      navigate("/login");
    });
  };

  return (
    <AsideContainer>
      <div className="aside-header">
        <div onClick={() => navigate("/")} className="back-btn cursor-pointer">
          <BsChevronDoubleLeft />
          <span>Back</span>
        </div>
        <span onClick={handleLogOut}>
          LogOut <AiOutlineLogout />
        </span>
      </div>
      <div className="logo">
        <FaGripfire />
        DoConnect
      </div>
      <menu>
        <ul>
          <li>
            <NavLink to="/dashboard/overview">
              <AiOutlineDashboard />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/create-post">
              <FiEdit />
              Ask Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/post-lists">
              <BsCardChecklist />
              View Question
            </NavLink>
          </li>
        </ul>
      </menu>
      <Profile>
        <div className="img">
          <img src={user?.photoURL} alt={user?.displayName} />
        </div>
        <div className="details">
          <h3>{user?.displayName}</h3>
          <small title={user?.email}>
            {user?.email
              ? user?.email?.length > 20
                ? user?.email?.slice(0, 20) + "..."
                : user?.email
              : "not available"}
          </small>
        </div>
      </Profile>
    </AsideContainer>
  );
};
const AsideContainer = styled.aside`
  position: relative;
  .aside-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    justify-content: space-between;
    color: var(--accent-color);
    margin-bottom: 1rem;
    span {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }
  .back-btn {
    position: relative;
    color: var(--accent-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .logo {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 2rem;
    color: var(--accent-color);
    padding: 0rem 1rem;
  }
  menu {
    position: relative;
    margin-top: 1rem;
    ul {
      position: relative;
      li {
        cursor: pointer;
        a {
          padding: 1rem 2rem;
          color: var(--accent-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          &:hover {
            background-color: #263957;
          }
        }
        a.active {
          background-color: #263957;
        }
      }
    }
  }
`;

const Profile = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.4rem;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid var(--accent-color);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .details {
    color: var(--accent-color);
  }
`;
export default Asidebar;
