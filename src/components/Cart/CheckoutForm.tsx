import React, { useState, useRef } from 'react'
import { TextField, Theme, Grid, Button } from '@mui/material/'
import { makeStyles } from '@mui/styles'
import { TextFieldProps } from 'material-ui'
import classes2 from './Cart.module.css'

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: { padding: '1rem' },
}))

const CheckoutForm = ({
  handleConfirmOrder,
  onDialogClose,
}: {
  handleConfirmOrder: (event: any) => void
  onDialogClose: () => void
}) => {
  const classes = useStyles()
  const [name, setName] = useState('' as string)
  const [street, setStreet] = useState('' as string)
  const [zipCode, setZipCode] = useState('' as string)
  const [city, setCity] = useState('' as string)

  const nameInputRef = useRef<TextFieldProps>(null)
  const streetInputRef = useRef<TextFieldProps>(null)
  const zipCodeInputRef = useRef<TextFieldProps>(null)
  const cityInputRef = useRef<TextFieldProps>(null)

  const handleSubmitOrder = (event: any) => {
    event.preventDefault()
    const enteredName = nameInputRef.current?.value
    const enteredStreet = streetInputRef.current?.value
    const enteredZipCode = zipCodeInputRef.current?.value
    const enteredCity = cityInputRef.current?.value
    console.log('🚀 ~ handleConfirmOrder ~ enteredName', enteredName)
    console.log('🚀 ~ handleConfirmOrder ~ enteredStreet', enteredStreet)
    console.log('🚀 ~ handleConfirmOrder ~ enteredZipCode', enteredZipCode)
    console.log('🚀 ~ handleConfirmOrder ~ enteredCity', enteredCity)
  }

  const checkoutActions = (
    <Grid className={classes2.actions}>
      <Button className={classes2['button--alt']} onClick={onDialogClose}>
        Cancel
      </Button>
      <Button onClick={handleSubmitOrder} className={classes2.button}>
        Confirm
      </Button>
    </Grid>
  )

  return (
    <form onSubmit={handleSubmitOrder}>
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
            inputRef={nameInputRef}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='street'
            label='Street'
            inputRef={streetInputRef}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='zipCode'
            label='Zip Code'
            inputRef={zipCodeInputRef}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='City'
            fullWidth
            id='city'
            inputRef={cityInputRef}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item>{checkoutActions}</Grid>
      </Grid>
    </form>
  )
}

export default CheckoutForm
