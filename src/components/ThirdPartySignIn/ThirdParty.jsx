import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";
import useFirebase from "../../hooks/useFirebase";
import { auth } from "../Firebase/Firebase.config";
const ThirdParty = () => {
  const { thirdPartySignIn } = useFirebase();
  /* handle google sign in */
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    thirdPartySignIn(auth, provider);
  };
  /* handle github sign in */
  const handleGithubSignIn = () => {
    const provider = new GithubAuthProvider();
    thirdPartySignIn(auth, provider);
  };
  /* handle facebook sign in */
  const handleFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    thirdPartySignIn(auth, provider);
  };
  /* handle twitter signIn */
  const handleTwitterSignIn = () => {
    console.log("object");
  };
  return (
    <div className="others-login">
      <div className="or">or</div>
      <div className="btn-groups">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          title="Google Sign In"
        >
          <AiFillGoogleCircle />
        </button>
        <button
          onClick={handleGithubSignIn}
          type="button"
          title="Github Sign In"
        >
          <AiFillGithub />
        </button>
        <button
          onClick={handleFacebookSignIn}
          type="button"
          title="Facebook Sign In"
        >
          <AiFillFacebook />
        </button>
        <button
          onClick={handleTwitterSignIn}
          type="button"
          title="Twitter Sign In"
        >
          <AiFillTwitterCircle />
        </button>
      </div>
    </div>
  );
};

export default ThirdParty;
