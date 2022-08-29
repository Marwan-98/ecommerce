import { StarIcon } from '@heroicons/react/solid'
import Layout from 'components/layout'
import { classNames } from 'lib'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import productsSlice, { product, products, setProduct } from 'store/slices/productsSlice'
import { addProduct, addToTotal, cartItems } from 'store/slices/cartSlice'
import { RadioGroup } from '@headlessui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Product } from 'types'
import { toNumber } from 'utils/toNumber'

export default function ProductPage({prod}: {prod: Product}) {
  const findProduct = prod
  const [selectedColor, setSelectedColor] = useState(findProduct?.colors[0])
  const [selectedSize, setSelectedSize] = useState(findProduct?.sizes[0])
  const dispatch = useDispatch()
  const cart = useSelector(cartItems);
  // const router = useRouter()
  // const productId = router.query.product
  // useEffect(() => {
  //   if(router.isReady && !findProduct) {
  //       axios.get(`http://localhost:3000/api/product/${productId}`).then((res) => {
  //       dispatch(setProduct(res.data))
  //       setSelectedColor(res.data.colors[0])
  //       setSelectedSize(res.data.sizes[0])
  //     })
  //   }
  //   return () => {
  //     dispatch(setProduct(undefined))
  //   }

  // }, [router.isReady])
  return (
    <Layout>
      <main className="pt-10 sm:pt-8 md:pt-0">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={findProduct?.images[0]?.src}
              alt={findProduct?.images[0]?.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={findProduct?.images[1]?.src}
                alt={findProduct?.images[1]?.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={findProduct?.images[2]?.src}
                alt={findProduct?.images[2]?.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={findProduct?.images[3]?.src}
              alt={findProduct?.images[3]?.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:py-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {findProduct?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{findProduct?.price}</p>
            
            {/* Colors */}
            <form className="mt-10">
            <div>
                <h3 className="text-sm text-gray-900 font-medium">Color</h3>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {findProduct?.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              </form>
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {findProduct?.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'absolute -inset-px rounded-md pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                              >
                                <svg
                                  className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  let found = false;
                  cart.map(item => {
                    if(item.id === findProduct.id && item.color === selectedColor.name && item.size === selectedSize.name) {
                      found = true;
                      if (item.quantity < findProduct.availableQty) {
                        dispatch(addProduct({...findProduct, quantity: 1, color: selectedColor?.name, size: selectedSize?.name, availableQty: Number(findProduct.availableQty)}))
                        dispatch(addToTotal(+toNumber(findProduct.price)))
                      } else {
                        alert(`Available Quantity is ${findProduct.availableQty}`)
                      }
                    }
                  })
                  if(!found) {
                    dispatch(addProduct({...findProduct, quantity: 1, color: selectedColor?.name, size: selectedSize?.name, availableQty: Number(findProduct.availableQty)}))
                    dispatch(addToTotal(+toNumber(findProduct.price)))
                  }
                }}
              >
                Add to bag
              </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{findProduct?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {findProduct?.highlights?.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-sm font-medium text-gray-900"
              >
                Details
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{findProduct?.details}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("http://localhost:3000/api/products")
  const products: Product[] = res.data;
  return {
    paths: products.map(prod => {
      return {params: {product: prod.id}}
    }),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const res = await axios.get(`http://localhost:3000/api/product/${params?.product}`)
  const prod: Product = res.data;
  return {
    props: {prod}
  }
}