import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Food } from "./Food";
import { useNavigate } from 'react-router-dom';
import ProgressCircle from "./ProgressCircle";
 
export const Home = () => {
    const navigate = useNavigate();
  const [data, setData] = useState({});
  console.log('data',data);
  const [completed, setCompleted] = useState({});
  const [userprofile, setUserprofile] = useState({});

  const [current, setCurrent] = useState("breakfast");

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:5000/meal-planner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        withCredential: true,
      });
      const json = await response.json();

      setData((prev) => json);
      setCompleted((prev) => json.completed);
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserProfile() {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        withCredential: true,
      });
      const json = await response.json();
      setUserprofile(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserData();
    getUserProfile();
    const val = getMealBasedOnTime();
    setCurrent((prev) => val);
  }, []);



  function getMealBasedOnTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 6 && hours < 12) {
      return "breakfast";
    } else if (hours >= 12 && hours < 18) {
      return "lunch";
    } else {
      return "dinner";
    }
  }

  //    console.log(userprofile);

  const getPercentage = (numerator, totalCalorie) => {
    if(!numerator || !totalCalorie) {
        return 0;
    }

    return (numerator * 1.0 / totalCalorie)*100;
  }

  return (
    <div className="home">
      <div className="home1">
        <h4>Welcome, {userprofile?.name}!</h4>{" "}
        <div className="report-profile">
          <img
            onClick={() => navigate("/report")}
            src="images/images 1.png"
          ></img>
          <img
            onClick={() => navigate("/profile")}
            src="images/image 1.png"
          ></img>
        </div>
      </div>
      <div className="home2">
        <div className="home2-macros">
          {/* <img src="images/Group 4.png"></img> */}

          <ProgressCircle
            progress={getPercentage(
              data?.macros_consumed?.calories,
              data?.meals?.breakfast?.macro_goals?.calories +
                data?.meals?.dinner?.macro_goals?.calories +
                data?.meals?.lunch?.macro_goals?.calories
            )}
            totalCalories={
              data?.meals?.breakfast?.macro_goals?.calories +
              data?.meals?.dinner?.macro_goals?.calories +
              data?.meals?.lunch?.macro_goals?.calories
            }
            caloriesAchieved={data?.macros_consumed?.calories}
          />

          <ul className="list-macros">
            <l1>
              <span className="macro-name">Carbs:</span>
              {data?.macros_consumed?.carbs}/
              {data?.meals?.breakfast?.macro_goals?.carbs +
                data?.meals?.dinner?.macro_goals?.carbs +
                data?.meals?.lunch?.macro_goals?.carbs}{" "}
              g
            </l1>
            <l1>
              <span className="macro-name">Fats:</span>
              {data?.macros_consumed?.fats}/
              {data?.meals?.breakfast?.macro_goals?.fats +
                data?.meals?.dinner?.macro_goals?.fats +
                data?.meals?.lunch?.macro_goals?.fats}
              g
            </l1>
            <l1>
              <span className="macro-name">Proteins:</span>
              {data?.macros_consumed?.protein}/
              {data?.meals?.breakfast?.macro_goals?.protein +
                data?.meals?.dinner?.macro_goals?.protein +
                data?.meals?.lunch?.macro_goals?.protein}
              g
            </l1>
          </ul>
        </div>
        <div className="MACROS">MACROS</div>
        <div className="goal-home">
          <img src="images/image 2.png"></img>
          <span>{userprofile?.current_goal}</span>
        </div>
        {/* <img src="images/Group 5.png"></img> */}
        <img src="images/Group 3 (1).png"></img>
      </div>

      <div className="home3">
        {current === "breakfast" && (
          <Food
            mealData={data?.meals?.breakfast}
            current={current}
            completed={completed}
            setCompleted={setCompleted}
            data={data}
            setData={setData}
          />
        )}
        {current === "lunch" && (
          <Food
            mealData={data?.meals?.lunch}
            current={current}
            completed={completed}
            setCompleted={setCompleted}
            data={data}
            setData={setData}
          />
        )}
        {current === "dinner" && (
          <Food
            mealData={data?.meals?.dinner}
            current={current}
            completed={completed}
            setCompleted={setCompleted}
            data={data}
            setData={setData}
          />
        )}
      </div>
    </div>
  );
};
