import React, { useState, useRef } from 'react'
import { TextField, Theme, Grid, Button, FormHelperText } from '@mui/material/'
import { makeStyles } from '@mui/styles'
import { TextFieldProps } from 'material-ui'
import classes2 from './Cart.module.css'

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: { padding: '1rem' },
}))

const isEmpty = (value: any) => value?.trim() === ''
const isInvalidZip = (value: any) => value.trim().length !== 5

const CheckoutForm = ({
  handleConfirmOrder,
  onDialogClose,
}: {
  handleConfirmOrder: (event: any) => void
  onDialogClose: () => void
}) => {
  const classes = useStyles()
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    zipCode: true,
    city: true,
  })

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

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredZipCodeIsValid = !isInvalidZip(enteredZipCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      zipCode: enteredZipCodeIsValid,
      city: enteredCityIsValid,
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredZipCodeIsValid

    if (formIsValid) {
      console.log('VALID FORM')
    }
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
            error={!formInputsValidity.name}
            fullWidth
            id='name'
            label='Name'
            inputRef={nameInputRef}
          />
          {!formInputsValidity.name && (
            <FormHelperText error>Please enter a valid name</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!formInputsValidity.street}
            fullWidth
            id='street'
            label='Street'
            inputRef={streetInputRef}
          />
          {!formInputsValidity.street && (
            <FormHelperText error>Please enter a valid street</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!formInputsValidity.zipCode}
            fullWidth
            id='zipCode'
            label='Zip Code'
            inputRef={zipCodeInputRef}
          />
          {!formInputsValidity.zipCode && (
            <FormHelperText error>Please enter a valid zip code</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!formInputsValidity.city}
            label='City'
            fullWidth
            id='city'
            inputRef={cityInputRef}
          />
          {!formInputsValidity.city && (
            <FormHelperText error>Please enter a valid city</FormHelperText>
          )}
        </Grid>
        <Grid item>{checkoutActions}</Grid>
      </Grid>
    </form>
  )
}

export default CheckoutForm
