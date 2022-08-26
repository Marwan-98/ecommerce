// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import { Buffer } from 'buffer/'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { CartItem } from 'types';
import nodemailer from 'nodemailer'
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
      console.log(req.body)
      let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        name: 'smtp.mail.com',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      const mailOption = {
        from: `123@gmail.com`,
        to: `${email}`,
        subject: `New mail from 123@gmail.com`,
        text: `thanks for buying :D`,
      };
      await transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      await doc.useServiceAccountAuth(credentials);
      await doc.loadInfo()
      const OrderSheet = doc.sheetsByTitle['Order']
      const ProductSheet = doc.sheetsByTitle['Products']
      const OrderItemSheet = doc.sheetsByTitle['OrderItem']
      const newOrder = await OrderSheet.addRow({ firstName, lastName, email, company, phone, address, apartment, city, region, country, deliveryMethod, paymentType, postalCode, cardNumber, nameOnCard, expirationDate, cvc })
      cart.map(async (item: CartItem) => {
        await OrderItemSheet.addRow({ orderId: newOrder.id, productId: item.id, quantity: item.quantity })
      })
      return res.json("Order Added");
    default:
      break;
  }
}
