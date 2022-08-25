// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import {Buffer} from 'buffer/'
import { Product } from 'types';

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | string>
) {
  switch (req.method) {
    case 'GET':
        const {id} = req.query
      return extractSheets(
        {
          spreadsheetKey: "1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI",
          credentials: credentials,
          sheetsToExtract: ["Products"],
        },
        function(err: any, data: {Products: Product[]}) {
          if(err) {
            return res.json(err)
          }
          const findProduct = data.Products.find(product => +product.id === +id!);
          return res.send(findProduct!);
        }
      );
    default:
      break;
  }
}
