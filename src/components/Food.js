import React from 'react'

export const Food=(props) =>{

  const { mealData,current } = props;
//   console.log(mealData);
  return (
    <>
    <div className="MACROS">{current}</div>
            <div className="home2-macros">
                    <img src="images/Image 4.png"></img>
                    <ul className="list-macros">
                        <l1><span className="macro-name">Macros</span></l1>
                        <l1>Calories-{mealData?.macro_goals?.calories}g</l1>
                        <l1>Proteins-{mealData?.macro_goals?.protein}g</l1> 
                        <l1>Carbs-{mealData?.macro_goals?.carbs}g</l1>                       
                        <l1>Fats-{mealData?.macro_goals?.fats}g</l1>
                    </ul>
                </div>
                <div className="name">{mealData?.recipe_name}</div>
                <div><span className="green">Ingredients:</span> {mealData?.ingredients}</div>
                <div className="marking-buttons">
                    <span className="get-complete-recipe">Get complete recipe</span>
                    <span className="meal-done">Mark meal as done</span>
                </div>
                <div className="ask-ai">
                <input type='text' placeholder="AI Chat" ></input>
                <img className='ai' src="images/Group 6.png"></img>
                 </div>
                 </> 
  )
}


