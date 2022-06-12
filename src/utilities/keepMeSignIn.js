

const KeepMeSignIn = (user, setUsers) =>{
  
    sessionStorage.setItem("uid", user.uid);
    localStorage.setItem("isAuth", true)
    const userItems = isHasUserInLocalStorage();
    const isHasItem = userItems.find(userItem => userItem.uid === user.uid);
    if(!isHasItem){
        userItems.push({
            uid: user.uid,
            displayName: user?.displayName ? user?.displayName : 'Unknown Person',
            photoURL: user?.photoURL,
            email: user?.email ? user?.email : 'null',
            emailVerified: user?.emailVerified 
        })
        localStorage.setItem("users", JSON.stringify(userItems));
        setUsers({
            uid: user.uid,
            displayName: user?.displayName ? user?.displayName : 'Unknown Person',
            photoURL: user?.photoURL,
            email: user?.email ? user?.email : 'null',
            emailVerified: user?.emailVerified 
        })
    }
}

const isHasUserInLocalStorage = () =>{
    const storageUsers = localStorage.getItem("users");
    let users = [];
    if(storageUsers){
        users = JSON.parse(storageUsers)
    }else{
        users = [];
    }
    return users;
}



export { KeepMeSignIn, isHasUserInLocalStorage };

