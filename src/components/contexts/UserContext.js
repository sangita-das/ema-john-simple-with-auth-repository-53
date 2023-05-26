import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'


export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);

    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
        
    }

    const logOut =() => {
        setLoading(true);
        return signOut(auth);
    }

   useEffect( () =>{
  const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
        console.log(currentUser)
            setUser(currentUser);
            setLoading(false);
    });

    return () => unSubscribe();

   } ,[])


    // const user = {email: 'abc'}

    const authInfo = {user, createUser, signIn, logOut, loading }
 
    return (
        <div>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>

            
        </div>
    );
};

export default UserContext;