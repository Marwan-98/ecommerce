import { expirationDate } from 'card-validator/dist/expiration-date'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CartItem } from 'types'
import { toNumber } from 'utils/toNumber'

const stripe = require('stripe')(String(process.env.STRIPE_SECERT_KEY))

type Data = {
  id: string
  firstName: string
  lastName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | any>
) {
  switch (req.method) {
    case 'POST':
      const { cart, cardNumber, cvc, expirationDate } = req.body
      let prices = 1
      cart.map(async (item: CartItem) => {
        prices += +toNumber(item.price) * item.quantity
      })
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round((prices + 5.0 + 5.52) * 100),
        currency: 'usd',
        payment_method_types: ['card'],
      })
      const token = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: expirationDate.split('/')[0],
          exp_year: expirationDate.split('/')[1],
          cvc: cvc,
        },
      })
      return res.json({
        paymentIntent: paymentIntent['client_secret'],
        token: token.id,
      })
    default:
      break
  }
}
