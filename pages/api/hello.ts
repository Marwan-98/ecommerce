// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import {Buffer} from 'buffer/'
import {GoogleSpreadsheet } from 'google-spreadsheet';

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
          sheetsToExtract: ["User"],
        },
        function(err: any, data: any) {
          if(err) {
            return res.json(err)
          }
          return res.send(data.User);
        }
      );
    case 'POST':
      const {firstName, lastName, email, company, phone, address, apartment, city, region, country} = req.body
      console.log(req.body)
      await doc.useServiceAccountAuth(credentials);  
      await doc.loadInfo()
      const userSheet = doc.sheetsByIndex[0]
      await userSheet.addRow({firstName, lastName, email, company, phone, address, apartment, city, region, country})
      return res.json("User Added");
    default:
      break;
  }
}
