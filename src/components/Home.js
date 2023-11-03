import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {Food} from './Food';

export const Home = ()=>{
    const  [data,setData]= useState({})
    const [userprofile,setUserprofile]=useState({})

const [current,setCurrent]= useState("breakfast");

    async function getUserData(){
        try{
            const response = await fetch("http://localhost:5000/meal-planner", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            withCredential: true
        });
        const json = await response.json()
        
        setData(prev => json)
        // console.log(data)
        }
        catch(err){
            console.log(err);
        }
    }

    async function getUserProfile (){
        try{
            const response=await fetch('http://localhost:5000/profile',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                withCredential: true
            });
            const json =await response.json()
            setUserprofile(json);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getUserData();
        getUserProfile();
        const val=getMealBasedOnTime();
        setCurrent(prev => val)
    },[])

    const navigate = useNavigate();

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


   console.log(data);
   
    return(
        <div className="home">
            <div className="home1">
            <h4>Welcome, {userprofile?.name}!</h4> <img src='images/image 1.png'></img>
            </div>
            <div className="home2">
                <div className="home2-macros">
                    <img src="images/Group 4.png"></img>
                    <ul className="list-macros">
                        <l1><span className="macro-name">Carbs:</span>{data?.macros_consumed?.carbs}/{data?.meals?.breakfast?.macro_goals?.carbs + data?.meals?.dinner?.macro_goals?.carbs + data?.meals?.lunch?.macro_goals?.carbs} g</l1>
                        <l1><span className="macro-name">Fats:</span>{data?.macros_consumed?.fats}/{data?.meals?.breakfast?.macro_goals?.fats + data?.meals?.dinner?.macro_goals?.fats + data?.meals?.lunch?.macro_goals?.fats}g</l1>
                        <l1><span className="macro-name">Proteins:</span>{data?.macros_consumed?.protein}/{data?.meals?.breakfast?.macro_goals?.protein + data?.meals?.dinner?.macro_goals?.protein + data?.meals?.lunch?.macro_goals?.protein}g</l1>
                    </ul>
                </div>
                <div className="MACROS">MACROS</div>
                <img src="images/Group 5.png"></img>
                <img src='images/Group 3 (1).png'></img>
            </div>

        <div className="home3">
            
            {current==="breakfast" && <Food mealData={data?.meals?.breakfast} current={current}/>}
            {current==="lunch" && <Food mealData={data?.meals?.lunch} current={current}/>}
            {current==="dinner" && <Food mealData={data?.meals?.dinner} current={current}/>}
        </div>
        </div>
    )
}