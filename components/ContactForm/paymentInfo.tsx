import { FormikProps } from 'formik'
import { formValues } from 'types'

const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

const PaymentInfo = ({ formik }: { formik: FormikProps<formValues> }) => {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900">Payment</h2>

      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
            <div key={paymentMethod.id} className="flex items-center">
              {paymentMethodIdx === 0 ? (
                <input
                  id={paymentMethod.id}
                  name="payment-type"
                  type="radio"
                  onClick={formik.handleChange}
                  value={paymentMethod.title}
                  defaultChecked
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              ) : (
                <input
                  id={paymentMethod.id}
                  name="payment-type"
                  type="radio"
                  onClick={formik.handleChange}
                  value={paymentMethod.title}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              )}

              <label
                htmlFor={paymentMethod.id}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {paymentMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
        <div className="col-span-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            Card number
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="card-number"
              value={formik.values['card-number']}
              onChange={formik.handleChange}
              name="card-number"
              autoComplete="cc-number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors['card-number'] ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors['card-number']}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="col-span-4">
          <label
            htmlFor="name-on-card"
            className="block text-sm font-medium text-gray-700"
          >
            Name on card
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name-on-card"
              value={formik.values['name-on-card']}
              onChange={formik.handleChange}
              name="name-on-card"
              autoComplete="cc-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors['name-on-card'] ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors['name-on-card']}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="col-span-3">
          <label
            htmlFor="expiration-date"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration date (MM/YY)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="expiration-date"
              value={formik.values['expiration-date']}
              onChange={formik.handleChange}
              id="expiration-date"
              autoComplete="cc-exp"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors['expiration-date'] ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors['expiration-date']}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['cvc']}
              onChange={formik.handleChange}
              name="cvc"
              id="cvc"
              autoComplete="csc"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.cvc ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.cvc}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
