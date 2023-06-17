import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// import axios from "axios";
import app1 from "./firebase.init";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuid, setmenuiD] = useState([]);
  const [label, setlabel] = useState(null);
  const [price, setprice] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);

  // Firebase authentication  Start
  const auth = getAuth(app1);
  const user1 = auth.currentUser;

  // Firebase authentication  Start

  // sign in with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with email and password
  //    User get  from Firebase
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  //    User get  from Firebase

  // Google Authentication
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);

    return signInWithPopup(auth, provider);
  };
  // Google Authentication

  // log Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userChange) => {
      setUser(userChange);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [auth]);
  // user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // log Out
  const Auth = {
    user,
    loading,
    login,
    updateUser,
    googleSignIn,
    logOut,
    createUser,
    label,
    setlabel,
    price,
    setprice,
    setCardDetails,
    cardDetails,
    menuid,
    setmenuiD,
  };
  return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
