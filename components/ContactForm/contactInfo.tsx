import { FormikProps } from 'formik'
import { formValues } from 'types'

const ContactInfo = ({ formik }: { formik: FormikProps<formValues> }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

      <div className="mt-4">
        <label
          htmlFor="email-address"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            value={formik.values['email-address']}
            onChange={formik.handleChange}
            id="email-address"
            name="email-address"
            autoComplete="email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {formik.touched && formik.errors['email-address'] ? (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{formik.errors['email-address']}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ContactInfo
