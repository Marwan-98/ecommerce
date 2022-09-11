import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/outline"
import { FormikProps } from "formik"
import { classNames } from "lib"
import { Dispatch, SetStateAction, useState } from "react"
import { DeliveryMethod, formValues } from "types"

const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
]

const ContactForm = ({ formik, selectedDeliveryMethod, setSelectedDeliveryMethod, deliveryMethods }: { formik: FormikProps<formValues>, selectedDeliveryMethod: Object, setSelectedDeliveryMethod: Dispatch<SetStateAction<DeliveryMethod>>, deliveryMethods: DeliveryMethod[] }) => {
    return (
        <div>
            <div>
                <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                </h2>

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
                    {formik.touched && formik.errors['email-address'] ? <span>{'check'}</span> : null}
                </div>
            </div>

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
                        {formik.touched && formik.errors['first-name'] ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors['last-name'] ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors.company ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors.address ? <span>{'check'}</span> : null}

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
                        {formik.touched && formik.errors.apartment ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors.city ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors.region ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors['postal-code'] ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors.phone ? <span>{'check'}</span> : null}
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                    name="delivery-method"
                >
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                        Delivery method
                    </RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {deliveryMethods.map((deliveryMethod) => (
                            <RadioGroup.Option
                                key={deliveryMethod.id}
                                value={deliveryMethod}
                                className={({ checked, active }) =>
                                    classNames(
                                        checked
                                            ? 'border-transparent'
                                            : 'border-gray-300',
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                    )
                                }
                            >
                                {({ checked, active }) => (
                                    <>
                                        <div className="flex flex-1">
                                            <div className="flex flex-col">
                                                <RadioGroup.Label
                                                    as="span"
                                                    className="block text-sm font-medium text-gray-900"
                                                >
                                                    {deliveryMethod.title}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className="mt-1 flex items-center text-sm text-gray-500"
                                                >
                                                    {deliveryMethod.turnaround}
                                                </RadioGroup.Description>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className="mt-6 text-sm font-medium text-gray-900"
                                                >
                                                    {deliveryMethod.price}
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked ? (
                                            <CheckCircleIcon
                                                className="h-5 w-5 text-indigo-600"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <div
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked
                                                    ? 'border-indigo-500'
                                                    : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-lg'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                            <div
                                key={paymentMethod.id}
                                className="flex items-center"
                            >
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
                        {formik.touched && formik.errors['card-number'] ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors['name-on-card'] ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors['expiration-date'] ? <span>{'check'}</span> : null}
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
                        {formik.touched && formik.errors.cvc ? <span>{'check'}</span> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm