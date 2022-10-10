import axios from 'axios'
import Layout from 'components/Layout/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Collection, Product } from 'types'
import { extractSheets } from 'spreadsheet-to-json'
import { Buffer } from 'buffer/'

export default function Example({ prods }: { prods: Product[] }) {
  return (
    <Layout>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Collection
        </h2>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {prods?.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )

  let res: Collection[] = []

  await new Promise((res) => setTimeout(res, 30000))

  await extractSheets(
    {
      spreadsheetKey: '1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI',
      credentials: credentials,
      sheetsToExtract: ['Collections'],
      // formatCell: formatCell
    },
    function (err: any, data: { Collections: Product[] }) {
      if (err) {
        return err
      }
      return (res = data.Collections)
    }
  )

  const collections: Collection[] = res

  return {
    paths: collections.map((collec) => {
      return { params: { collection: collec.id } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )
  let res: Product[] = []
  await new Promise((res) => setTimeout(res, 30000))
  await extractSheets(
    {
      spreadsheetKey: '1GSLrLTt1dya45r9NYXUQeEUPp_Q_Fn1x-gGgrH3UzTI',
      credentials: credentials,
      sheetsToExtract: ['Products'],
    },
    function (err: any, data: { Products: Product[] }) {
      if (err) {
        return err
      }
      const findProducts = data.Products.filter(
        (product) => product.collectionId === params?.collection
      )
      res = findProducts
    }
  )
  const prods: Product[] = res
  return {
    props: { prods },
  }
}
