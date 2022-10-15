import React, { useState, useEffect } from 'react'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import {
  Backdrop,
  CircularProgress,
  Card,
  List,
  Typography,
} from '@mui/material'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-af1c7-default-rtdb.firebaseio.com/meals.json'
      )
      console.log('🚀 ~ fetchMeals ~ response', response)
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
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
      setLoading(false)
      console.log('🚀 ~ fetchMeals ~ mealsArray', mealsArray)
    }

    fetchMeals().catch((error) => {
      console.error(error.message)
      setLoading(false)
      setError(true)
    })
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
      <Card style={{ minHeight: 150 }}>
        <List>{renderMealsList()}</List>
        {error ? (
          <Typography align='center'>
            Uh oh, something isn't right...
          </Typography>
        ) : null}
      </Card>
    </section>
  )
}

export default AvailableMeals
