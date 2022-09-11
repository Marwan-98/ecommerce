import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'
import Dropdown from 'components/dropdown'
import Layout from 'components/layout'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { classNames } from 'lib'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToTotal, cartItems, cartTotal, changeQuantity, removeProduct } from 'store/slices/cartSlice'
import axios from 'axios'
import valid from "card-validator"
import { loadStripe } from '@stripe/stripe-js'
import { toNumber } from 'utils/toNumber'
import ContactForm from 'components/contactForm'
import OrderSummary from 'components/orderSummary'

const deliveryMethods = [
  {
      id: 1,
      title: 'Standard',
      turnaround: '4–10 business days',
      price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]

export default function Checkout() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const [open, setOpen] = useState(false)

  const total = useSelector(cartTotal);
  const AllcartItems = useSelector(cartItems);

  const formik = useFormik({
    initialValues: {
      'email-address': '',
      'first-name': '',
      'last-name': '',
      'company': '',
      'address': '',
      'apartment': '',
      'city': '',
      'country': 'United States',
      'region': '',
      'payment-type': 'Credit card',
      'postal-code': '',
      'phone': '',
      'card-number': '',
      'name-on-card': '',
      'expiration-date': '',
      'cvc': ''
    },
    onSubmit: (values) => {
      axios.post("http://localhost:3000/api/orders", {
          firstName: values['first-name'],
          lastName: values['last-name'],
          email: values['email-address'],
          company: values['company'],
          phone: values['phone'],
          address: values['address'],
          apartment: values['apartment'],
          city: values['city'],
          region: values['region'],
          country: values['country'],
          deliveryMethod: selectedDeliveryMethod.title,
          paymentType:values['payment-type'],
          postalCode:values['postal-code'],
          cardNumber:values['card-number'],
          nameOnCard: values['name-on-card'],
          expirationDate: values['expiration-date'],
          cvc: values['cvc'],
          cart: [
            ...AllcartItems
          ]
      }).then(async (res) => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
        await stripe?.confirmCardPayment(res.data.paymentIntent, {
          payment_method: {
            card: {
              token: res.data.token
            },
          }
        }).then((res) => {
          console.log(res)
        })
      })
    },
    validationSchema:  yup.object({
      'first-name': yup.string().matches(/^[A-Z]+$/i).required(),
      'last-name': yup.string().matches(/^[a-zA-Z]+$/).required(),
      'company': yup.string().required(),
      'phone': yup.string().matches(/^[0-9]+$/).max(12).required(),
      'address': yup.string().required(),
      'apartment': yup.string().required(),
      'city': yup.string().required(),
      'region': yup.string().required(),
      'postal-code': yup.string().test(value => valid.postalCode(value).isValid),
      'card-number': yup.string().test(value => valid.number(value).isValid),
      'name-on-card': yup.string().test(value => valid.cardholderName(value).isValid),
      'expiration-date': yup.string().test(value => valid.expirationDate(value).isValid),
      'cvc': yup.string().test(value => valid.cvv(value).isValid)
    })
  });
  return (
    <Layout>
      <div className="bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={formik.handleSubmit}>
              <ContactForm formik={formik} deliveryMethods={deliveryMethods} selectedDeliveryMethod={selectedDeliveryMethod} setSelectedDeliveryMethod={setSelectedDeliveryMethod}/>

              {/* Order summary */}
              <OrderSummary />
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}

