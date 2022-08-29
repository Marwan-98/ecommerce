// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import {Buffer} from 'buffer/'
import { Collection, Product } from 'types';

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Collection[] | string>
) {
  switch (req.method) {
    case 'GET':
      return extractSheets(
        {
          spreadsheetKey: "1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI",
          credentials: credentials,
          sheetsToExtract: ["Collections"],
          // formatCell: formatCell
        },
        function(err: any, data: {Collections: Collection[]}) {
          if(err) {
            return res.json(err)
          }
          return res.send(data.Collections);
        }
      );
    default:
      break;
  }
}
