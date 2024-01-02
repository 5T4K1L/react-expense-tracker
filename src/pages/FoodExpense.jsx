import React, { useContext, useState } from "react";
import food from "../svgs/chicken-thighs-meat-svgrepo-com(1).svg";
import "../styles/TravelExpense.css";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const FoodExpense = () => {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [spent, setSpent] = useState("");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "userHistory"), {
      category: "food",
      expense: spent,
      name,
      uid: currentUser.uid,
      dateAdded: serverTimestamp(),
    });

    await addDoc(collection(db, "userToday"), {
      category: "food",
      expense: spent,
      name,
      uid: currentUser.uid,
      dateAdded: serverTimestamp(),
      dateDelete: Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000),
    });

    await addDoc(collection(db, "userWeek"), {
      category: "food",
      expense: spent,
      name,
      uid: currentUser.uid,
      dateAdded: serverTimestamp(),
      dateDelete: Timestamp.fromMillis(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    nav("/");
  };

  return (
    <div className="travelContainer">
      <div className="upper">
        <p>Add Food Expense</p>
        <img src={food} alt="" />
      </div>

      <div className="contents">
        <p>
          Add your new <span>food</span>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name of what you spent"
          />
          <input
            onChange={(e) => setSpent(e.target.value)}
            type="text"
            placeholder="How much you spent"
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default FoodExpense;
