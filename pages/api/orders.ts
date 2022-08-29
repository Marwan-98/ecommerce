// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import { Buffer } from 'buffer/'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { CartItem } from 'types';
import nodemailer from 'nodemailer'
import * as MailTemp from 'utils/mailTemp';
import {render} from 'mjml-react';
import { toNumber } from 'utils/toNumber';
const stripe = require('stripe')(String(process.env.STRIPE_SECERT_KEY))

const doc = new GoogleSpreadsheet('1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI');

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
)

type Data = {
  id: string,
  firstName: string,
  lastName: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | any>
) {
  switch (req.method) {
    case 'GET':
      return extractSheets(
        {
          spreadsheetKey: "1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI",
          credentials: credentials,
          sheetsToExtract: ["Order"],
        },
        function (err: any, data: { Order: Data[] }) {
          if (err) {
            return res.json(err)
          }
          return res.send(data.Order);
        }
      );
    case 'POST':
      const { firstName, lastName, email, company, phone, address, apartment, city, region, country, deliveryMethod, paymentType, postalCode, cardNumber, nameOnCard, expirationDate, cvc, cart } = req.body
      let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        auth: {
          user: 'i-node-1-2-2-1@outlook.com', // generated ethereal user
          pass: 'Abc123Abc', // generated ethereal password
        },
      });
      await doc.useServiceAccountAuth(credentials);
      await doc.loadInfo()
      const OrderSheet = doc.sheetsByTitle['Order']
      const ProductSheet = doc.sheetsByTitle['Products']
      const OrderItemSheet = doc.sheetsByTitle['OrderItem']
      const newOrder = await OrderSheet.addRow({ firstName, lastName, email, company, phone, address, apartment, city, region, country, deliveryMethod, paymentType, postalCode, cardNumber, nameOnCard, expirationDate, cvc })
      let prices = 1;
      cart.map(async (item: CartItem) => {
        prices += +toNumber(item.price) * item.quantity
        await OrderItemSheet.addRow({ orderId: newOrder.id, productId: item.id, quantity: item.quantity, size: item.size, color: item.color })
      })
      const paymentIntent = await stripe.paymentIntents.create({
        amount: (prices + 5.00 + 5.52) * 100,
        currency: 'usd',
        payment_method_types: ['card']
      });
      const token =  await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: 8,
          exp_year: 2028,
          cvc: cvc
        }
      })
      const mailOption = {
        from: `i-node-1-2-2-1@outlook.com`,
        to: `${email}`,
        subject: `We are honored ${firstName} 🙏`,
        text: '',
        html: render(MailTemp.generate(), {validationLevel: "soft"}).html
      };
      await transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      return res.json({paymentIntent: paymentIntent['client_secret'], token: token.id});
    default:
      break;
  }
}
