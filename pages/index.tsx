import type { GetStaticProps } from 'next'
import Layout from 'components/Layout/layout'
import axios from 'axios'
import { Collection, Product } from 'types'
import Hero from 'components/hero'
import Trending from 'components/trending'
import Perks from 'components/perks'

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
  const res = await axios.get(`http://localhost:3000/api/products`)
  const res2 = await axios.get(`http://localhost:3000/api/collections`)
  const prods: Product[] = res.data
  const collecs: Collection[] = res2.data
  return {
    props: { prods, collecs },
  }
}
