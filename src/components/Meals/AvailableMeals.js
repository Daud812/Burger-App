import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";

const AvailableMeals = () => {
  const [meals,setMeals] = useState([])
  useEffect(()=>{
    async function fetchMeals() {
      const response = await fetch(
        "https://react-http-94395-default-rtdb.firebaseio.com/melas.json"
      );
      const data = await response.json();
      const loadedMeals = [];
      for(const key in data){
        loadedMeals.push({
          id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
        })  
      } 
      setMeals(loadedMeals)
    }
    fetchMeals();
  },[])
  const mealsList = meals.map((meal) => (
      <MealsItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
  ));

  return (
    <section className={classes.meals}>
      <Card>
          <ul>{mealsList}</ul>
        </Card>
    </section>
  );
};
export default AvailableMeals;
