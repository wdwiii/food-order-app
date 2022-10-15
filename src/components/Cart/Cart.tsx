import React, { useContext, useState } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import { Button, Dialog, DialogTitle, List, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Meal } from '../../interfaces/interfaces'

const useStyles = makeStyles({
  dialog: {
    paddingBottom: '1.5rem',
  },
})

const Cart = (props: any) => {
  const classes2 = useStyles()
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${
    cartCtx.totalAmount > 0 ? cartCtx.totalAmount.toFixed(2) : '0.00'
  }`
  console.log('🚀 ~ Cart ~ cartCtx.totalAmount', cartCtx.totalAmount)
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item: any) => {
    cartCtx.addItem(item)
  }

  const cartItems = (
    <List>
      {cartCtx.items.map((item: Meal) => (
        <CartItem
          key={item.id}
          item={item}
          onAdd={cartItemAddHandler}
          onRemove={cartItemRemoveHandler}
        />
      ))}
    </List>
  )

  return (
    <Dialog open={true} fullWidth classes={{ paper: classes2.dialog }}>
      {cartItems}
      <div className={classes.total}>
        <Box component='span'>Total Amount</Box>
        <Box component='span'>{totalAmount}</Box>
      </div>
      <div className={classes.actions}>
        <Button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </Button>
        {hasItems && <Button className={classes.button}>Order</Button>}
      </div>
    </Dialog>
  )
}

export default Cart
