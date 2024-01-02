import React, { useContext, useEffect, useState } from "react";
import travel from "../../svgs/travel-svgrepo-com(1).svg";
import material from "../../svgs/clothes-svgrepo-com.svg";
import food from "../../svgs/chicken-thighs-meat-svgrepo-com(1).svg";

import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/CurrentUserContext";

const ThisWeek = () => {
  const { currentUser } = useContext(AuthContext);
  const [totalTravel, setTotalTravel] = useState(0);
  const [totalFood, setTotalFood] = useState(0);
  const [totalMaterial, setTotalMaterial] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      if (currentUser.uid) {
        const q = query(
          collection(db, "userWeek"),
          where("uid", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);

        let totalexpense = 0;
        let foodExpense = 0;
        let materialExpense = 0;
        let totalPrice = 0;

        snapshot.docs.forEach(async (doc) => {
          const docData = doc.data();
          const catTotal = Number(docData.expense);
          const categoryTotal = (totalPrice += catTotal);
          setTotalCategory(categoryTotal);

          if (
            Math.round(docData.dateAdded / 1000) >=
            Math.round(docData.dateDelete / 1000)
          ) {
            await deleteDoc(doc.ref);
          } else {
            if (docData.category === "travel") {
              const expense = Number(docData.expense);
              const total = (totalexpense += expense);
              setTotalTravel(total);
            }

            if (docData.category === "material") {
              const expense = Number(docData.expense);
              const materialTotal = (materialExpense += expense);
              setTotalMaterial(materialTotal);
            }

            if (docData.category === "food") {
              const expense = Number(docData.expense);
              const foodTotal = (foodExpense += expense);
              setTotalFood(foodTotal);
            }
          }
        });
      }
    };

    getUser();
  }, [currentUser.uid]);

  return (
    <div>
      <div className="contents">
        <div className="things">
          <div className="left">
            <img src={travel} style={{ height: 40 }} alt="" />
            <p>Total travel expense</p>
          </div>
          <div className="right">
            <p>{totalTravel}</p>
          </div>
        </div>
        <div className="things">
          <div className="left">
            <img src={material} style={{ height: 40 }} alt="" />
            <p>Total material expense</p>
          </div>
          <div className="right">
            <p>{totalMaterial}</p>
          </div>
        </div>
        <div className="food">
          <div className="left">
            <img src={food} style={{ height: 30 }} alt="" />
            <p>Total food expense</p>
          </div>
          <div className="right">
            <p>{totalFood}</p>
          </div>
        </div>
        <div className="things">
          <div className="left">
            <p style={{ fontSize: 15, padding: 8 }}>Total</p>
          </div>
          <div className="right">
            <p>{totalCategory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisWeek;
