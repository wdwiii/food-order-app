import { useContext } from 'react'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'
import { Typography, ListItem, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

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

const MealItem = ({ id, name, description, price }) => {
  const classes = useStyles()
  const cartCtx = useContext(CartContext)
  const formattedPrice = `$${price.toFixed(2)}`

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: formattedPrice,
    })
  }

  return (
    <ListItem className={classes.meal}>
      <Box>
        <Typography variant='h5' className={classes.name}>
          {name}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
        <Typography className={classes.price}>{formattedPrice}</Typography>
      </Box>
      <Box>
        <MealItemForm onAddToCart={addToCartHandler} />
      </Box>
    </ListItem>
  )
}

export default MealItem
