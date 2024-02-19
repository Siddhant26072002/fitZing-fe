
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export const Profile = () =>{
    const [isprofile,setIsprofile]=useState(false)
    const navigate = useNavigate();
    const [data,setData]=useState({
        name: "",
        gender: "",
        age: "",
        food:"",
        weight: 0,
        height: 0,
    });

    const [medical,setMedical]=useState([]);

     const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const loadProfile = async()=>{
        try{
            const response=await fetch('http://localhost:5000/profile',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                withCredential: true
            });
            const json =await response.json();
            if(json.name===""){
                setIsprofile(false);
            }
            else{
                setIsprofile(true);
            }
            console.log(json,'json');
            setData({...data, name:json.name,gender:json.gender,food:json.food_preference,age:json.age,
            height:json.height,weight:json.weight});
            setMedical(json.medical_conditions);
            setGoal(json.current_goal);

            console.log(json);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        loadProfile();
    },[])

    const handleMedical=(event)=>{
         const clickedText = event.target.textContent;
         if(medical.includes(clickedText)===true){
            setMedical((prevMedical) => prevMedical.filter(item => item !== clickedText));
         }
         else{
            setMedical((prevMedical) => [...prevMedical, clickedText]);
         }
        console.log(`You clicked: ${clickedText}`);
    }

    const [goal,setGoal]=useState("Strength Training");

    const handleGoal=(e)=>{
        setGoal(e.target.textContent)
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/update-profile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            withCredential: true,
            body: JSON.stringify({ name: data.name, gender: data.gender, food_preference:data.food,
            age: data.age,height: data.height,weight: data.weight,current_goal: goal, medical_conditions: medical })
        });
        const json = await response.json()
        console.log(json);
        
        if (json.message) {
            alert("success");
            navigate("/home");
        } else {
            alert("Invalid Credential");
        }
    }
  return (
    <div className="profile">
      {isprofile && (
        <img
          onClick={() => navigate("/home")}
          className="back-button"
          src="/images/Group 11.png"
        ></img>
      )}
      <div className="profile-header">Profile</div>

      <div className="profile-form">
        <input
          type="text"
          value={data.name}
          onChange={onChange}
          id="name"
          name="name"
          placeholder="Name"
        ></input>
        <div className="gender-age">
          <select
            id="gender"
            name="gender"
            value={data.gender}
            onChange={onChange}
          >
            <option value="" disabled selected>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select id="age" name="age" value={data.age} onChange={onChange}>
            <option value="" disabled selected>
              Age
            </option>
            <option value="<16">&lt;16</option>
            <option value="16-21">16-21</option>
            <option value="21-30">21-30</option>
            <option value="31-40">31-40</option>
            <option value="41-50">41-50</option>
            <option value=">50">&gt;50</option>
          </select>
        </div>

        <div className="gender-age">
          <div className="height">
            <label for="height">Height:</label>
         
            <input
              type="number"
              value={data.height}
              onChange={onChange}
              id="height"
              name="height"
              placeholder="enter in cms"
            ></input>
          </div>

          <div className="weight">
            <label for="weight">Weight:</label>
            <input
              type="number"
              value={data.weight}
              onChange={onChange}
              id="weight"
              name="weight"
              placeholder="enter in kgs"
            ></input>
          </div>
        </div>

        <select id="food" name="food" value={data.food} onChange={onChange}>
          <option value="" disabled selected>
            Food Preference
          </option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="both">both</option>
        </select>
        <div className="medical">
          <div className="medical-header">Medical Conditions:</div>
          <div className="medical-btns">
            <button
              onClick={handleMedical}
              className={
                medical.includes("Diabetic") === true ? "highlight-medical" : ""
              }
            >
              Diabetic
            </button>
            <button
              onClick={handleMedical}
              className={
                medical.includes("Lactose Intolerant") === true
                  ? "highlight-medical"
                  : ""
              }
            >
              Lactose Intolerant
            </button>
            <button
              onClick={handleMedical}
              className={
                medical.includes("Asthma") === true ? "highlight-medical" : ""
              }
            >
              Asthma
            </button>
            <button
              onClick={handleMedical}
              className={
                medical.includes("Pregnancy") === true
                  ? "highlight-medical"
                  : ""
              }
            >
              Pregnancy
            </button>
          </div>
        </div>
        <div className="goal">
          <div className="goal-header">Current Goal:</div>
          <div className="goal-btns">
            <button
              onClick={handleGoal}
              className={
                goal === "Strength Training" ? "highlight-medical" : ""
              }
            >
              Strength Training
            </button>
            <button
              onClick={handleGoal}
              className={
                goal === "Flexibility and Mobility" ? "highlight-medical" : ""
              }
            >
              Flexibility and Mobility
            </button>
            <button
              onClick={handleGoal}
              className={
                goal === "Healthy Weight Gain" ? "highlight-medical" : ""
              }
            >
              Healthy Weight Gain
            </button>
            <button
              onClick={handleGoal}
              className={goal === "Weight Loss" ? "highlight-medical" : ""}
            >
              Weight Loss
            </button>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit} className="signup-btn">
          Update
        </button>
      </div>
    </div>
  );
}
