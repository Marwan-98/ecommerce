import type { GetStaticProps } from 'next'
import Layout from 'components/Layout/layout'
import axios from 'axios'
import { Collection, Product } from 'types'
import Hero from 'components/hero'
import Trending from 'components/trending'
import Perks from 'components/perks'
import { extractSheets } from 'spreadsheet-to-json'
import { Buffer } from 'buffer/'

const Home = ({
  prods,
  collecs,
}: {
  prods: Product[]
  collecs: Collection[]
}) => {
  return (
    <div className="">
      <Layout>
        <main>
          <Hero collecs={collecs} />

          <Trending Allproducts={prods} />

          <Perks />
        </main>
      </Layout>
    </div>
  )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
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
      // formatCell: formatCell
    },
    function (err: any, data: { Products: Product[] }) {
      if (err) {
        return err
      }
      return (res = data.Products)
    }
  )
  let res2: Collection[] = []
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
      return (res2 = data.Collections)
    }
  )
  const prods: Product[] = res
  const collecs: Collection[] = res2
  return {
    props: { prods, collecs },
  }
}
