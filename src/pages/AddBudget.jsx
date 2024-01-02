import React, { useContext, useState } from "react";
import "../styles/TravelExpense.css";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const FoodExpense = () => {
  const { currentUser } = useContext(AuthContext);

  const [budget, setBudget] = useState("");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const q = query(
      collection(db, "userBudget"),
      where("uid", "==", currentUser.uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      await setDoc(doc(db, "userBudget", currentUser.uid), {
        uid: currentUser.uid,
        budget,
      });
    } else {
      const userBudgetRef = doc(db, "userBudget", currentUser.uid);
      await updateDoc(userBudgetRef, {
        budget,
      });
    }

    nav("/");
  };

  return (
    <div className="travelContainer">
      <div className="upper">
        <p>Add your Budget</p>
      </div>

      <div className="contents">
        <p>
          Add your weekly <span>budget</span>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            style={{ marginTop: 50 }}
            onChange={(e) => setBudget(e.target.value)}
            type="text"
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default FoodExpense;
