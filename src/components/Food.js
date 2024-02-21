import React, { useState } from "react";

export const Food = (props) => {
  const { mealData, current, completed, setCompleted, data, setData } = props;
  const markMealDone = () => {
    setCompleted({ ...completed, [current]: true });
    updateMealStatus();
  };
  const [showRecipeinst, setShowRecipeinst] = useState(false);

  const [userinput, setUserinput] = useState("");
  console.log("mealdata", mealData?.recipe_instructions);

  const getCustomisemeal = async () => {
    const response = await fetch("http://localhost:5000/customize-meal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      withCredential: true,
      body: JSON.stringify({ meal_time: current, user_input: userinput }),
    });
    const json = await response.json();

    setData({
      ...data,
      [data.meals[current].recipe_name]: json.recipe_name,
      [data.meals[current].macro_goals]: json.macro_goals,
      [data.meals[current].ingredients]: json.ingredients,
    });

    window.location.reload();
  };

  const updateMealStatus = async () => {
    const response = await fetch("http://localhost:5000/update-meal-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      withCredential: true,
      body: JSON.stringify({ meal_time: current }),
    });
    const json = await response.json();
    // console.log(json);
  };
  // console.log(completed);

  function toggleRecipeInst() {
    setShowRecipeinst((prev) => !prev);
  }

  return (
    <>
      <div className="MACROS">{current}</div>
      <div className="home2-macros">
        <img
          className="food-image"
          src={mealData?.img_url ? mealData.img_url : "images/Image 4.png"}
        ></img>
        <ul className="list-macros">
          <l1>
            <span className="macro-name">Macros</span>
          </l1>
          <l1>Calories-{mealData?.macro_goals?.calories}g</l1>
          <l1>Proteins-{mealData?.macro_goals?.protein}g</l1>
          <l1>Carbs-{mealData?.macro_goals?.carbs}g</l1>
          <l1>Fats-{mealData?.macro_goals?.fats}g</l1>
        </ul>
      </div>
      <div className="name">{mealData?.recipe_name}</div>
      <div>
        <span className="green">Ingredients:</span> {mealData?.ingredients}
      </div>
      {!completed[current] ? (
        <>
          <div className="marking-buttons">
            <button className="get-complete-recipe" onClick={toggleRecipeInst}>
              {showRecipeinst
                ? `Hide Recipe Instructions`
                : `Get complete recipe`}
            </button>
            <span className="meal-done" onClick={markMealDone}>
              Mark meal as done
            </span>
          </div>
          {showRecipeinst && mealData && (
            <p> {mealData?.recipe_instructions} </p>
          )}
          <div className="ask-ai">
            <input
              type="text"
              placeholder="AI Chat"
              value={userinput}
              onChange={(e) => setUserinput(e.target.value)}
              style={{
                border: "1px solid green",
                borderRadius: "7px",
                padding: "5px",
              }}
            ></input>
            <img
              onClick={getCustomisemeal}
              className="ai"
              src="images/Group 6.png"
            ></img>
          </div>
        </>
      ) : (
        <img src="/images/Group 9.png"></img>
      )}
    </>
  );
};
