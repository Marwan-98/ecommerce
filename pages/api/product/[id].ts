// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import {Buffer} from 'buffer/'
import { Image, Product } from 'types';

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
          sheetsToExtract: ["Products", "ImageSheet"],
        },
        function(err: any, data: {Products: Product[], ImageSheet: Image[]}) {
          if(err) {
            return res.json(err)
          }
          const findProduct = data.Products.find(product => +product.id === +id!);
          const findImages = data.ImageSheet.filter(image => +image.productId! === +id!);
          console.log(findImages);
          return res.send({...findProduct!, images: findImages.map(image => {
            return {
            src: image.src, alt: image.alt
            }
        }),
        colors: [],
      sizes: []});
        }
      );
    default:
      break;
  }
}
