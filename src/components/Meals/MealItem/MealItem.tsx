import { useContext } from 'react'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'
import { Typography, ListItem, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { MenuFoodItem } from '../../../interfaces/interfaces'

const useStyles = makeStyles({
  meal: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ccc',
  },
  description: { fontStyle: 'italic' },
  price: {
    marginTop: '0.25rem',
    fontWeight: 'bold',
    color: '#ad5502',
    fontSize: '1.25rem',
  },
  name: {
    margin: '0 0 0.25rem 0',
  },
})

const formatPrice = (price: number) => `$${price.toFixed(2)}`

const MealItem = ({ id, name, description, price }: MenuFoodItem) => {
  const classes = useStyles()
  const cartCtx = useContext(CartContext)

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    })
  }

  return (
    <ListItem className={classes.meal}>
      <Box>
        <Typography variant='h5' className={classes.name}>
          {name}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
        <Typography className={classes.price}>{formatPrice(price)}</Typography>
      </Box>
      <Box>
        <MealItemForm onAddToCart={addToCartHandler} />
      </Box>
    </ListItem>
  )
}

export default MealItem
