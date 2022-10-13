import React, { useState, useEffect } from 'react'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { Backdrop, CircularProgress, Card } from '@mui/material'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://react-http-af1c7-default-rtdb.firebaseio.com/meals.json'
        )
        const data = await response.json()

        const mealsArray = []
        for (let key in data) {
          mealsArray.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          })
        }
        setMeals(mealsArray)
        console.log('🚀 ~ fetchMeals ~ mealsArray', mealsArray)
      } catch (error) {
        console.error('error')
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [])

  const renderMealsList = () =>
    meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))

  return loading ? (
    <Backdrop open={loading}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <section className={classes.meals}>
      <Card>
        <ul>{renderMealsList()}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
