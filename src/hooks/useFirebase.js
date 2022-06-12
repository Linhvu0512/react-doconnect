import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../components/Firebase/Firebase.config";

const useFirebase = () =>{
   const [user, setUser] = useState({})
   const [isAuth, setIsAuth] = useState(false);

   /* sign in third party tools */
   const thirdPartySignIn = (auth, provider) =>{
    signInWithPopup(auth, provider)
    .then((response) => {
     setIsAuth(true);
    })
    .catch((err) => {
      toast.error(err.message.split(":")[1]);
      console.log(err);
    });
    }

    /* sign in with email password */

    useEffect(()=>{
        onAuthStateChanged(auth, user =>{
            setUser(user)
            user?.uid ? setIsAuth(true) : setIsAuth(false)          
        } )
    }, [])

return {user, thirdPartySignIn, isAuth}

};
export default useFirebase;