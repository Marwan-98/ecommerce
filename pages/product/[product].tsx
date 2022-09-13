import Layout from 'components/Layout/layout'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Product } from 'types'
import ProductImages from 'components/ProductInfo/productImages'
import ProductInfo from 'components/ProductInfo/ProductInfo'

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
  const res = await axios.get('http://localhost:3000/api/products')
  const products: Product[] = res.data
  return {
    paths: products.map((prod) => {
      return { params: { product: prod.id } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/product/${params?.product}`
  )
  const prod: Product = res.data
  return {
    props: { prod },
  }
}
