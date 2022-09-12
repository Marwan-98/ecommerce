import { Product } from 'types'

const ProductImages = ({ findProduct }: { findProduct: Product }) => {
  return (
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
  )
}

export default ProductImages
