import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";
import { AuthContext } from "../../App";
import { auth, storage } from "../Firebase/Firebase.config";
import ThirdParty from "../ThirdPartySignIn/ThirdParty";
const SignUp = () => {
  /* get value from context api */
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    isAuth && navigate("/dashboard/overview");
  }, [isAuth, navigate]);

  /* for sign up */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  /*  form ref */
  const formRef = useRef(null);
  /* handle sign up  */
  const handleSignUp = (event) => {
    event.preventDefault();
    if (!name) return toast.error("Name field is required.");
    if (!email) return toast.error("Email field is required.");
    if (!password) return toast.error("Password field is required.");
    if (!confirmPassword)
      return toast.error("Confirm Password field is required.");
    if (password !== confirmPassword)
      return toast("Password not matched.", { type: "error" });
    if (!avatar.name) return toast.error("Put your avatar");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const imageRef = ref(storage, `/images/${avatar.name + v4()}`);
        uploadBytes(imageRef, avatar).then((response) => {
          toast.success("uploaded image");
          getDownloadURL(response.ref).then((url) => {
            /*update user profile*/
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: url
                ? url
                : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
            }).then(() => {
              toast.success("User profile updated");
              navigate("/dashboard/overview");
            });
          });
        });

        toast.success("User created successfully.");
        /*sent verification email */
        sendEmailVerification(auth.currentUser).then(() => {
          toast.success(`Send email for verification to ${email}`);
        });

        /* reset form  */
        formRef.current.reset();
      })
      .catch((err) => {
        toast.error(err.message.split(":")[1]);
      });
  };

  return (
    <SignUpContainer>
      <div className="login-container">
        <div className="wrapper">
          <h1>
            Sign Up into<span className="colorize"> Account</span>
          </h1>
          <form action="#" onSubmit={handleSignUp} ref={formRef}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onBlur={(event) => setName(event.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onBlur={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onBlur={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                onBlur={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="file">Select Avatar</label>
              <input
                onChange={(event) => setAvatar(event.target.files[0])}
                type="file"
              />
            </div>
            <div className="input-group">
              <button className="btn">Sign Up into Account</button>
            </div>
            <ThirdParty />
            <div className="actions">
              <p>
                Already have Account? <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </SignUpContainer>
  );
};
const SignUpContainer = styled.section`
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
export default SignUp;
