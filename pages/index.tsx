import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Layout from 'components/layout'
import { products, setProducts } from 'store/slices/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Collection, Product } from 'types'
import Hero from 'components/hero'
import Trending from 'components/trending'
import Perks from 'components/perks'

const Home = ({prods, collecs}: {prods: Product[], collecs: Collection[]}) => {
  const Allproducts = prods;
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/products").then(res => res.json()).then(json => dispatch(setProducts(json)))
  // }, [])
  return (
    <div className="">
      <Layout>
        <main>
          {/* Hero section */}
          <Hero collecs={collecs} />

          <Trending Allproducts={prods} />

          <Perks />
        </main>
      </Layout>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({params}) => {
  const res = await axios.get(`http://localhost:3000/api/products`)
  const res2 = await axios.get(`http://localhost:3000/api/collections`)
  const prods: Product[] = res.data;
  const collecs: Collection[] = res2.data;
  return {
    props: {prods, collecs}
  }
}