import React, { useContext, useEffect, useState } from "react";
import edit from "../../svgs/edit-4-svgrepo-com.svg";
import { AuthContext } from "../../context/CurrentUserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const CardLike = () => {
  const { currentUser } = useContext(AuthContext);
  const [weekBudget, setWeekBudget] = useState(0);
  const [left, setLeft] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    let totalWeek = 0;
    const getBudget = async () => {
      if (currentUser.uid) {
        const q = query(
          collection(db, "userBudget"),
          where("uid", "==", currentUser.uid)
        );

        const q2 = query(
          collection(db, "userWeek"),
          where("uid", "==", currentUser.uid)
        );

        const snapshot2 = await getDocs(q2);
        snapshot2.docs.forEach((doc) => {
          let week = doc.data();
          let weekExpense = Number(week.expense);
          let weekexpense = (totalWeek += weekExpense);
          setWeekTotal(weekexpense);
        });

        const snapshot = await getDocs(q);
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const money = Number(data.budget);
          const moneyLeft = money - weekTotal;
          setLeft(moneyLeft);
          setWeekBudget(data.budget);
        });
      }
    };
    getBudget();
  }, [currentUser.uid, weekTotal]);

  return (
    <div className="cardLike">
      <div className="upper">
        <div className="circleOne"></div>
        <div className="circleTwo"></div>
        <p>This Week Budget</p>
        <button onClick={() => nav("/add-budget")}>
          <img src={edit} alt="" />
        </button>
      </div>
      <div className="lower">
        <p>Php {weekBudget}</p>
        <button>{/* <img src={eye} alt="" /> */}</button>
      </div>
      <p className="moneyLeft">Money left: {left}</p>
    </div>
  );
};

export default CardLike;
