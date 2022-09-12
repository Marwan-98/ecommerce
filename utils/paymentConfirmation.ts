import { loadStripe } from '@stripe/stripe-js'

const paymentConfirmation = async (res: any) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
  const confirm = await stripe?.confirmCardPayment(res.data.paymentIntent, {
    payment_method: {
      card: {
        token: res.data.token,
      },
    },
  })
  return confirm
}

export default paymentConfirmation
