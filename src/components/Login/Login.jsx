import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../App";
import { auth } from "../Firebase/Firebase.config";
import ThirdParty from "../ThirdPartySignIn/ThirdParty";
const Login = () => {
  const navigate = useNavigate();

  /* context value */
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    isAuth && navigate("/dashboard/overview");
  }, [isAuth, navigate]);

  const [reset, setReset] = useState(false);
  /* for Login */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* form ref */
  const formRef = useRef(null);
  const handleSignInUser = (event) => {
    event.preventDefault();
    if (!email) return toast.error("Email field is required.");
    if (!password && !reset) return toast.error("Password field is required.");

    /* sign in using email password */
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        formRef.current.reset();
        setEmail("");
        setPassword("");
        navigate("/dashboard/overview");
        toast.success("Successfully loggedIn");
      })
      .catch((error) => {
        toast.error(error.message.split(":")[1]);
      });

    /* reset password */
    if (reset) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success(`We email you with password reset link to ${email}`);
        })
        .catch(() => {
          toast.error("Something went wrong.");
        });
    }
  };

  return (
    <LoginContainer>
      <div className="login-container">
        <div className="wrapper">
          <h1>
            {reset ? (
              <>
                Reset <span className="colorize">Password</span>
              </>
            ) : (
              <>
                Login into<span className="colorize"> Account</span>
              </>
            )}
          </h1>
          <form action="#" onSubmit={handleSignInUser} ref={formRef}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onBlur={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </div>
            {!reset && (
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onBlur={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                />
              </div>
            )}
            <div className="actions">
              <p>
                {reset ? "Go to Login" : "Forgot password?"}
                <span
                  className="colorize cursor-pointer"
                  onClick={() => setReset((prev) => !prev)}
                >
                  {reset ? " Page" : " Reset"}
                </span>
              </p>
            </div>

            <div className="input-group">
              <button className="btn">
                {!reset ? "Login into Account" : "Reset Password"}
              </button>
            </div>
            {!reset && <ThirdParty />}

            <div className="actions">
              <p>
                Not even Account? <NavLink to="/sign-up">Create</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </LoginContainer>
  );
};
const LoginContainer = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 90vh;
  .wrapper {
    width: 400px;
    padding: 2rem;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    position: relative;
    border-radius: 5px;
    @media (max-width: 600px) {
      width: 100%;
      padding-bottom: 12rem;
    }
    h1 {
      margin-bottom: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      position: relative;
      gap: 1rem;
      .input-group {
        position: relative;
        input {
          width: 100%;
          padding: 0.8rem 1rem;
          font-size: 1rem;
          border-radius: 5px;
          border: 2px solid #ccc;
          outline: none;
          margin-top: 0.3rem;
          &:focus {
            border: 2px solid var(--main-color);
          }
        }
      }
    }
    .others-login {
      text-align: center;
      .btn-groups {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 0.3rem;
        button {
          border: 1px solid var(--main-color);
          color: var(--main-color);
          background: transparent;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.4s ease;
          &:hover {
            background-color: var(--main-color);
            color: var(--accent-color);
          }
        }
      }
    }
    .or {
      position: relative;
      text-align: center;
      margin: 0.6rem 0rem;
      color: var(--main-color);
      text-transform: capitalize;
      &::after,
      &::before {
        content: "";
        width: 45%;
        height: 1px;
        background: var(--main-color);
        display: block;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
      }
      &::before {
        right: 0;
      }
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-top: 0.5rem;
      a {
        font-weight: bold;
        color: var(--main-color);
      }
      span {
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
`;
export default Login;
