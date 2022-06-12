import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { KeepMeSignIn } from "./keepMeSignIn";


const thirdPartySignIn = (auth, provider, setUsers, setIsAuth) =>{
    
    signInWithPopup(auth, provider)
    .then((response) => {
     KeepMeSignIn(response.user, setUsers);
     setIsAuth(true);
     
    })
    .catch((err) => {
      toast.error(err.message.split(":")[1]);
      console.log(err);
    });
}



export { thirdPartySignIn };

