import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { cartItems, removeProduct, addToTotal, changeQuantity, cartTotal } from "store/slices/cartSlice";
import { toNumber } from "utils/toNumber";
import Dropdown from "./dropdown";

const OrderSummary = () => {
    const AllcartItems = useSelector(cartItems);
    const total = useSelector(cartTotal);
    const dispatch = useDispatch()
    return (
        <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">
          Order summary
        </h2>

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
                      <p className="mt-1 text-sm text-gray-500">
                        {product.size}
                      </p>
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
                            dispatch(addToTotal(-toNumber(product.price) * product.quantity))
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
                          dispatch(changeQuantity({ id: product.id, quantity: +e, color: product.color, size: product.size }))
                        }}
                        values={Array.from(
                          Array(product.availableQty),
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
              <dd className="text-sm font-medium text-gray-900">
                ${total}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">
                $5.00
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">
                $5.52
              </dd>
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
              Confirm order
            </button>
          </div>
        </div>
      </div>
    )
}

export default OrderSummary