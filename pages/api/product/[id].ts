// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import { Buffer } from 'buffer/'
import { Color, HighLight, Image, ItemColors, ItemHighlights, ItemSize, Product, Size } from 'types';

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | string>
) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query
      return extractSheets(
        {
          spreadsheetKey: "1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI",
          credentials: credentials,
          sheetsToExtract: ["Products", "ImageSheet", "HighLights", "ItemHighlights", "Colors", "ItemColors", "Sizes", "ItemSizes"],
        },
        function (err: any, data: { Products: Product[], ImageSheet: Image[], HighLights: HighLight[], ItemHighlights: ItemHighlights[], Colors: Color[], ItemColors: ItemColors[], Sizes: Size[], ItemSizes: ItemSize[] }) {
          if (err) {
            return res.json(err)
          }
          const findProduct = data.Products.find(product => product.id === id);
          const findImages = data.ImageSheet.filter(image => image.productId === id);
          const findItemHighLights = data.ItemHighlights.map(highLight => highLight.productId === id ? highLight.highlightId : null)
          const findHighLights = data.HighLights.filter(highLight => findItemHighLights.includes(highLight.id))
          const findItemColors = data.ItemColors.map(itemColor => itemColor.productId === id ? itemColor.colorId : null);
          const findColors = data.Colors.filter(color => findItemColors.includes(color.id));
          const findItemSizes = data.ItemSizes.map(itemSize => itemSize.productId === id ? itemSize.sizeId : null);
          const findSizes = data.Sizes.map(size => findItemSizes.includes(size.id) ? {...size, name: size.name, inStock: true} : {...size, name: size.name, inStock: false});

          if (findProduct) {
            return res.send({
              ...findProduct, 
              images: findImages.map(image => {
                return {
                  src: image.src, alt: image.alt
                }
              }),
              highlights: findHighLights.map(highligh => highligh.highLight),
              colors: findColors,
              sizes: findSizes
            })
          } else {
            return res.send("product not found");
          }
        }
      )
    default:
      res.send("product not found");
  }
}
