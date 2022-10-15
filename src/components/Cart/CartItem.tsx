import React from 'react'
import { Button, ListItem, Box, Typography, Grid, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Meal } from '../../interfaces/interfaces'

const useStyles = makeStyles({
  actions: { display: 'flex', flexDirection: 'column' },
  amount: {
    fontWeight: 'bold',
    border: '1px solid #ccc',
    padding: '0.25rem 0.75rem',
    borderRadius: '6px',
    color: '#363636',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #8a2b06',
    padding: '1rem 0',
    margin: '1rem 0',
  },
  foodDetails: { paddingLeft: '1rem' },
  price: { fontWeight: 'bold', color: '#8a2b06' },

  summary: {
    width: '10rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const CartItem = ({
  item,
  onAdd,
  onRemove,
}: {
  item: Meal
  onAdd: (id: any) => void
  onRemove: (item: any) => void
}) => {
  const classes = useStyles()
  const { id, name, price, amount } = item

  return (
    <ListItem component={Grid} className={classes.cartItem}>
      <Grid item className={classes.foodDetails}>
        <Typography variant='h6'>{name}</Typography>
        <Box className={classes.summary}>
          <Box component='span' className={classes.price}>
            {price}
          </Box>
          <Box component='span' className={classes.amount}>
            x {amount}
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.actions}>
        <Button onClick={() => onRemove(id)}>−</Button>
        <Button onClick={() => onAdd(item)}>+</Button>
      </Grid>
    </ListItem>
  )
}

export default CartItem
