import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, addToTotal } from 'store/slices/cartSlice'
import { Product } from 'types'
import { toNumber } from 'utils/toNumber'
import ProductColors from './productColors'
import ProductDetails from './productDetails'
import ProductSizes from './productSizes'

const ProductInfo = ({ findProduct }: { findProduct: Product }) => {
  const [selectedColor, setSelectedColor] = useState(findProduct?.colors[0])
  const [selectedSize, setSelectedSize] = useState(findProduct?.sizes[0])
  const dispatch = useDispatch()
  return (
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
        <ProductColors
          findProduct={findProduct}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        {/* Sizes */}
        <ProductSizes
          findProduct={findProduct}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            dispatch(
              addProduct({
                ...findProduct,
                quantity: 1,
                color: selectedColor?.name,
                size: selectedSize?.name,
              })
            )
            dispatch(addToTotal(+toNumber(findProduct.price)))
          }}
        >
          Add to bag
        </button>
      </div>

      {/* Description and details */}
      <ProductDetails findProduct={findProduct} />
    </div>
  )
}

export default ProductInfo
