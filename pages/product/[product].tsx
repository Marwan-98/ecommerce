import Layout from 'components/Layout/layout'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import ProductImages from 'components/ProductInfo/productImages'
import ProductInfo from 'components/ProductInfo/ProductInfo'
import { extractSheets } from 'spreadsheet-to-json'
import { Buffer } from 'buffer/'
import {
  Color,
  HighLight,
  Image,
  ItemColors,
  ItemHighlights,
  ItemSize,
  Product,
  Size,
} from 'types'

export default function ProductPage({ prod }: { prod: Product }) {
  const findProduct = prod
  return (
    <Layout>
      <main className="pt-10 sm:pt-8 md:pt-0">
        {/* Image gallery */}
        <ProductImages findProduct={findProduct} />

        {/* Product info */}
        <ProductInfo findProduct={findProduct} />
      </main>
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )
  let products: Product[] = []
  await extractSheets(
    {
      spreadsheetKey: '1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI',
      credentials: credentials,
      sheetsToExtract: ['Products'],
      // formatCell: formatCell
    },
    function (err: any, data: { Products: Product[] }) {
      if (err) {
        return err
      }
      return (products = data.Products)
    }
  )
  return {
    paths: products.map((prod) => {
      return { params: { product: prod.id } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )
  let prod = {}
  await extractSheets(
    {
      spreadsheetKey: '1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI',
      credentials: credentials,
      sheetsToExtract: [
        'Products',
        'ImageSheet',
        'HighLights',
        'ItemHighlights',
        'Colors',
        'ItemColors',
        'Sizes',
        'ItemSizes',
      ],
    },
    function (
      err: any,
      data: {
        Products: Product[]
        ImageSheet: Image[]
        HighLights: HighLight[]
        ItemHighlights: ItemHighlights[]
        Colors: Color[]
        ItemColors: ItemColors[]
        Sizes: Size[]
        ItemSizes: ItemSize[]
      }
    ) {
      if (err) {
        return err
      }
      const findProduct = data.Products.find(
        (product) => product.id === params?.product
      )
      const findImages = data.ImageSheet.filter(
        (image) => image.productId === params?.product
      )
      const findItemHighLights = data.ItemHighlights.map((highLight) =>
        highLight.productId === params?.product ? highLight.highlightId : null
      )
      const findHighLights = data.HighLights.filter((highLight) =>
        findItemHighLights.includes(highLight.id)
      )
      const findItemColors = data.ItemColors.map((itemColor) =>
        itemColor.productId === params?.product ? itemColor.colorId : null
      )
      const findColors = data.Colors.filter((color) =>
        findItemColors.includes(color.id)
      )
      const findItemSizes = data.ItemSizes.map((itemSize) =>
        itemSize.productId === params?.product ? itemSize.sizeId : null
      )
      const findSizes = data.Sizes.map((size) =>
        findItemSizes.includes(size.id)
          ? { ...size, name: size.name, inStock: true }
          : { ...size, name: size.name, inStock: false }
      )
      if (findProduct) {
        prod = {
          ...findProduct,
          images: findImages.map((image) => {
            return {
              src: image.src,
              alt: image.alt,
            }
          }),
          highlights: findHighLights.map((highligh) => highligh.highLight),
          colors: findColors,
          sizes: findSizes,
        }
      } else {
        return 'product not found'
      }
    }
  )
  return {
    props: { prod },
  }
}
