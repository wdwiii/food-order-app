import React, { useContext, useState } from 'react'

import CartItem from './CartItem'
import classes2 from './Cart.module.css'
import CartContext from '../../store/cart-context'
import { Button, Dialog, List, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Meal } from '../../interfaces/interfaces'
import CheckoutForm from './CheckoutForm'

const useStyles = makeStyles({
  dialog: {
    paddingBottom: '1.5rem',
  },
})

const Cart = (props: any) => {
  const classes = useStyles()
  const cartCtx = useContext(CartContext)
  const [isCheckout, setIsCheckout] = useState(false as boolean)

  const totalAmount = `$${
    cartCtx.totalAmount > 0 ? cartCtx.totalAmount.toFixed(2) : '0.00'
  }`

  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item: any) => {
    cartCtx.addItem(item)
  }

  const checkoutHandler = () => setIsCheckout(true)

  const handleConfirmOrder = (event: any) => {
    event.preventDefault()
    console.log('hit')
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

  const modalActions = (
    <Box className={classes2.actions}>
      <Button className={classes2['button--alt']} onClick={props.onClose}>
        Close
      </Button>
      {hasItems && (
        <Button onClick={checkoutHandler} className={classes2.button}>
          Order
        </Button>
      )}
    </Box>
  )

  return (
    <Dialog open={true} fullWidth classes={{ paper: classes.dialog }}>
      {cartItems}
      {hasItems ? (
        <>
          {isCheckout ? (
            <CheckoutForm
              handleConfirmOrder={handleConfirmOrder}
              onDialogClose={props.onClose}
            />
          ) : null}
          <div className={classes2.total}>
            <Box component='span'>Total Amount</Box>
            <Box component='span'>{totalAmount}</Box>
          </div>
        </>
      ) : (
        <Box>
          <Typography variant='h6' color='initial' align='center'>
            Your cart is empty.
          </Typography>
        </Box>
      )}
      {!isCheckout && modalActions}
    </Dialog>
  )
}

export default Cart
