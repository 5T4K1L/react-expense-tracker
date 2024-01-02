import React, { useContext, useEffect, useState } from "react";

import travel from "../../svgs/travel-svgrepo-com(1).svg";
import material from "../../svgs/clothes-svgrepo-com.svg";
import food from "../../svgs/chicken-thighs-meat-svgrepo-com(1).svg";
import edit from "../../svgs/edit-4-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/CurrentUserContext";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const Daily = () => {
  const { currentUser } = useContext(AuthContext);

  const [travelExp, setTravelExp] = useState(0);
  const [materialExp, setMaterialExp] = useState(0);
  const [foodExp, setFoodExp] = useState(0);
  const [allTotal, setAllTotal] = useState(0);

  useEffect(() => {
    let totalTravelExp = 0;
    let totalMaterialExp = 0;
    let totalFoodExp = 0;
    let alltotalexpense = 0;

    const getData = async () => {
      if (currentUser.uid) {
        const q = query(
          collection(db, "userToday"),
          where("uid", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        snapshot.docs.forEach(async (doc) => {
          const docData = doc.data();
          const expense = Number(docData.expense);

          const allTotal = (alltotalexpense += expense);
          setAllTotal(allTotal);

          if (
            Math.round(docData.dateAdded / 1000) >=
            Math.round(docData.dateDelete / 1000)
          ) {
            await deleteDoc(doc.ref);
          } else {
            if (docData.category === "travel") {
              const totalexpense = (totalTravelExp += expense);
              setTravelExp(totalexpense);
            }
            if (docData.category === "material") {
              const totalmaterial = (totalMaterialExp += expense);
              setMaterialExp(totalmaterial);
            }
            if (docData.category === "food") {
              const totalfood = (totalFoodExp += expense);
              setFoodExp(totalfood);
            }
          }
        });
      }
    };

    getData();
  }, [currentUser.uid]);

  return (
    <div className="contents">
      <div className="things">
        <div className="left">
          <img src={travel} style={{ height: 40 }} alt="" />
          <p>Travel expense</p>
          <Link to="/add-travel-expense">
            <button>
              <img
                src={edit}
                style={{ height: 20, marginTop: 7, marginLeft: 5 }}
                alt=""
              />
            </button>
          </Link>
        </div>
        <div className="right">
          <p>{travelExp}</p>
        </div>
      </div>
      <div className="things">
        <div className="left">
          <img src={material} style={{ height: 40 }} alt="" />
          <p>Material expense</p>
          <Link to="/add-material-expense">
            <button>
              <img
                src={edit}
                style={{ height: 20, marginTop: 7, marginLeft: 5 }}
                alt=""
              />
            </button>
          </Link>
        </div>
        <div className="right">
          <p>{materialExp}</p>
        </div>
      </div>
      <div className="food">
        <div className="left">
          <img src={food} style={{ height: 30 }} alt="" />
          <p>Food expense</p>
          <Link to="/add-food-expense">
            <button>
              <img src={edit} style={{ height: 20, marginTop: 7 }} alt="" />
            </button>
          </Link>
        </div>
        <div className="right">
          <p>{foodExp}</p>
        </div>
      </div>
      <div className="things">
        <div className="left">
          <p style={{ fontSize: 15, padding: 8 }}>Total</p>
        </div>
        <div className="right">
          <p>{allTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default Daily;
