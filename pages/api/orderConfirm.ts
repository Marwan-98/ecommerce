import type { NextApiRequest, NextApiResponse } from 'next'
import { Buffer } from 'buffer/'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { CartItem } from 'types'
import nodemailer from 'nodemailer'
import * as MailTemp from 'utils/mailTemp'
import { render } from 'mjml-react'

const doc = new GoogleSpreadsheet(
  '1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI'
)

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const {
        firstName,
        lastName,
        email,
        company,
        phone,
        address,
        apartment,
        city,
        region,
        country,
        deliveryMethod,
        paymentType,
        postalCode,
        cardNumber,
        nameOnCard,
        expirationDate,
        cvc,
        cart,
      } = req.body
      let testAccount = await nodemailer.createTestAccount()
      const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        auth: {
          user: 'i-node-1-2-2-1@outlook.com', // generated ethereal user
          pass: 'Abc123Abc', // generated ethereal password
        },
      })
      await doc.useServiceAccountAuth(credentials)
      await doc.loadInfo()
      const OrderSheet = doc.sheetsByTitle['Order']
      const OrderItemSheet = doc.sheetsByTitle['OrderItem']
      const newOrder = await OrderSheet.addRow({
        firstName,
        lastName,
        email,
        company,
        phone,
        address,
        apartment,
        city,
        region,
        country,
        deliveryMethod,
        paymentType,
        postalCode,
        cardNumber,
        nameOnCard,
        expirationDate,
        cvc,
      })
      cart.map(async (item: CartItem) => {
        await OrderItemSheet.addRow({
          orderId: newOrder.id,
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })
      })
      const mailOption = {
        from: `i-node-1-2-2-1@outlook.com`,
        to: `${email}`,
        subject: `We are honored ${firstName} 🙏`,
        text: '',
        html: render(MailTemp.generate(), { validationLevel: 'soft' }).html,
      }
      await transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log(err)
        }
      })
      return res.status(200).json('Order Successful')
  }
}
