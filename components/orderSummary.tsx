import { TrashIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import {
  cartItems,
  removeProduct,
  addToTotal,
  changeQuantity,
  cartTotal,
} from 'store/slices/cartSlice'
import { toNumber } from 'utils/toNumber'
import Dropdown from './ShoppingCart/dropdown'

const OrderSummary = ({ loading }: { loading: boolean }) => {
  const AllcartItems = useSelector(cartItems)
  const total = useSelector(cartTotal)
  const dispatch = useDispatch()
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {AllcartItems.map((product) => (
            <li key={product.id} className="flex py-6 px-4 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-20 rounded-md"
                />
              </div>

              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <a
                        href={product.href}
                        className="font-medium text-gray-700 hover:text-gray-800"
                      >
                        {product.name}
                      </a>
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                  </div>

                  <div className="ml-4 flow-root flex-shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove</span>
                      <TrashIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(removeProduct(product))
                          dispatch(
                            addToTotal(
                              -toNumber(product.price) * product.quantity
                            )
                          )
                        }}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-between pt-2">
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.price}
                  </p>

                  <div className="ml-4">
                    <label htmlFor="quantity" className="sr-only">
                      Quantity
                    </label>
                    <Dropdown
                      onChange={(e) => {
                        dispatch(
                          changeQuantity({
                            id: product.id,
                            quantity: +e,
                            color: product.color,
                            size: product.size,
                          })
                        )
                      }}
                      values={Array.from(
                        Array(+product.availableQty),
                        (_, i) => i + 1
                      )}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">${total}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Taxes</dt>
            <dd className="text-sm font-medium text-gray-900">$5.52</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">
              ${(total + 5 + 5.52).toFixed(2)}
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            <span style={{ display: loading ? 'none' : 'block' }}>
              Confirm order
            </span>
            <div role="status" style={{ display: !loading ? 'none' : 'block' }}>
              <svg
                className="text-white-200 dark:text-white-600 mr-2 inline h-6 w-6 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
