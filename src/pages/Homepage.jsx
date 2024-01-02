import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Homepage.css";
import CardLike from "../components/Homepage/CardLike";
import Greetings from "../components/Homepage/Greetings";
import Expense from "../components/Homepage/Expense";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [userID, setUserID] = useState();

  const [username, setUsername] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
        nav("/login");
      }
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [nav]);

  useEffect(() => {
    const getUsername = async () => {
      if (userID) {
        const q = query(collection(db, "users"), where("uid", "==", userID));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();
          const userUsername = userData.username;
          setUsername("Hi " + userUsername);
        }
      }
    };

    getUsername();
  }, [userID]);
  return (
    <div className="homepageContainer">
      <Greetings username={username} />
      <CardLike />
      <Expense />
    </div>
  );
};

export default Homepage;
