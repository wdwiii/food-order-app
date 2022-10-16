import React, { useState } from 'react'
import { TextField, Theme, Grid, Button } from '@mui/material/'
import { makeStyles } from '@mui/styles'
import classes2 from './Cart.module.css'

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: { padding: '1rem' },
}))

const CheckoutForm = ({
  handleSubmit,
  onDialogClose,
}: {
  handleSubmit: (event: any) => void
  onDialogClose: () => void
}) => {
  const classes = useStyles()
  const [name, setName] = useState('' as string)
  const [street, setStreet] = useState('' as string)
  const [zipCode, setZipCode] = useState('' as string)
  const [city, setCity] = useState('' as string)

  const handleConfirmOrder = (event: any) => {
    event.preventDefault()
    console.log('hit')
  }

  const checkoutActions = (
    <Grid className={classes2.actions}>
      <Button className={classes2['button--alt']} onClick={onDialogClose}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} className={classes2.button}>
        Confirm
      </Button>
    </Grid>
  )

  return (
    <form onSubmit={handleConfirmOrder}>
      <Grid
        container
        item
        rowSpacing={2}
        className={classes.formWrapper}
        justifyContent={'flex-end'}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='name'
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='street'
            label='Street'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='zipCode'
            label='Zip Code'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='City'
            fullWidth
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item>{checkoutActions}</Grid>
      </Grid>
    </form>
  )
}

export default CheckoutForm
