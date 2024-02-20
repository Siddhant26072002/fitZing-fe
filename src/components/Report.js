import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Linegraph from "./Linegraph";

export const Report = () => {
  
  const navigate = useNavigate();
  
  const [data,setData]=useState();
  const [currentgraphData,setCurrentgraphData]=useState({
    data1:[],
    data2:[],
    label:[]
  });
  const [category,setCategory] = useState("calorie");

  const onChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if(data){
    const val={
      label: data[`dates`],
      data1: data[`${category}_hits`],
      data2: data[`${category}_targets`]
    }
    setCurrentgraphData(val);
    }
    console.log(currentgraphData);
  }, [category]);



  const loadReport = async () => {
    try {
      const response = await fetch("http://localhost:5000/weekly-report", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        withCredential: true,
      });
      const json = await response.json();
      
     
      setData(json);
    
      console.log(json,"json");
    console.log(data);

    
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);





  return (
    <div className="profile">
      <img
        onClick={() => navigate("/home")}
        className="back-button"
        src="/images/Group 11.png"
      ></img>

      <div className="profile-header">Reports (last 7 days)</div>

      <div className="profile-form">
        <div className="gender-age">
          <select
            id="gender"
            name="category"
            value={category}
            onChange={onChange}
          >
            <option value="" disabled selected>
              Category
            </option>
            <option value="calorie">calorie</option>
            <option value="protein">protein</option>
            <option value="fats">fats</option>
            <option value="carbs">carbs</option>
          </select>
        </div>

        <div className="graph">
          <Linegraph graphdata={currentgraphData} />
        </div>
      </div>
    </div>
  );
};
