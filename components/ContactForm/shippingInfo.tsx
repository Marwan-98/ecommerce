import { FormikProps } from 'formik'
import { formValues } from 'types'

const ShippingInfo = ({ formik }: { formik: FormikProps<formValues> }) => {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900">
        Shipping information
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            First name
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['first-name']}
              onChange={formik.handleChange}
              id="first-name"
              name="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors['first-name'] ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors['first-name']}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            Last name
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['last-name']}
              onChange={formik.handleChange}
              id="last-name"
              name="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors['last-name'] ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors['last-name']}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['company']}
              onChange={formik.handleChange}
              name="company"
              id="company"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.company ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['address']}
              onChange={formik.handleChange}
              name="address"
              id="address"
              autoComplete="street-address"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.address ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="apartment"
            className="block text-sm font-medium text-gray-700"
          >
            Apartment, suite, etc.
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['apartment']}
              onChange={formik.handleChange}
              name="apartment"
              id="apartment"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.apartment ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.apartment}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['city']}
              onChange={formik.handleChange}
              name="city"
              id="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.city ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.city}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <div className="mt-1">
            <select
              id="country"
              name="country"
              value={formik.values['country']}
              onChange={formik.handleChange}
              autoComplete="country-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            State / Province
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['region']}
              onChange={formik.handleChange}
              name="region"
              id="region"
              autoComplete="address-level1"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.region ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.region}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700"
          >
            Postal code
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="postal-code"
              value={formik.values['postal-code']}
              onChange={formik.handleChange}
              id="postal-code"
              autoComplete="postal-code"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors['postal-code'] ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors['postal-code']}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={formik.values['phone']}
              onChange={formik.handleChange}
              name="phone"
              id="phone"
              autoComplete="tel"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {formik.touched && formik.errors.phone ? (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{formik.errors.phone}</p>
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

export default ShippingInfo
