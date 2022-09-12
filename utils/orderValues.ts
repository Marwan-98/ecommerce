export const orderValues = (values: any, detail: string) => {
  if (detail === 'user') {
    return {
      firstName: values['first-name'],
      lastName: values['last-name'],
      email: values['email-address'],
      company: values['company'],
      phone: values['phone'],
      address: values['address'],
      apartment: values['apartment'],
      city: values['city'],
      region: values['region'],
      country: values['country'],
      paymentType: values['payment-type'],
      postalCode: values['postal-code'],
      cardNumber: values['card-number'],
      nameOnCard: values['name-on-card'],
      expirationDate: values['expiration-date'],
      cvc: values['cvc'],
    }
  }
  return {
    paymentType: values['payment-type'],
    cardNumber: values['card-number'],
    nameOnCard: values['name-on-card'],
    expirationDate: values['expiration-date'],
    cvc: values['cvc'],
  }
}
