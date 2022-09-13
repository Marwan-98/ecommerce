import Layout from 'components/Layout/layout'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { cartItems, cartTotal } from 'store/slices/cartSlice'
import ContactForm from 'components/ContactForm/contactForm'
import OrderSummary from 'components/orderSummary'
import { orderValidationSchema } from 'utils/orderValidationSchema'
import { orderInitialValues } from 'utils/orderInitialValues'
import AppNotification from 'components/notfication'
import orderIntialization from 'utils/orderIntialization'
import paymentConfirmation from 'utils/paymentConfirmation'
import addOrder from 'utils/addOrder'

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
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  )
  const [visible, setVisible] = useState('invisible')
  const [loading, setLoading] = useState(false)

  const total = useSelector(cartTotal)
  const AllcartItems = useSelector(cartItems)

  const formik = useFormik({
    initialValues: orderInitialValues,
    onSubmit: (values) => {
      setLoading(true)
      orderIntialization(values, AllcartItems).then(async (res) => {
        paymentConfirmation(res).then((res) => {
          if (!res!.error) {
            addOrder(values, selectedDeliveryMethod, AllcartItems).then(() => {
              setLoading(false)
            })
            formik.resetForm()
          } else {
            setVisible('visible')
            setLoading(false)
            setTimeout(() => {
              setVisible('invisible')
            }, 2000)
          }
        })
      })
    },
    validationSchema: orderValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  })
  return (
    <Layout>
      <div className="bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form
              className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
              onSubmit={formik.handleSubmit}
            >
              <ContactForm
                formik={formik}
                deliveryMethods={deliveryMethods}
                selectedDeliveryMethod={selectedDeliveryMethod}
                setSelectedDeliveryMethod={setSelectedDeliveryMethod}
              />

              <OrderSummary loading={loading} />
            </form>
          </div>
          <AppNotification visible={visible} />
        </main>
      </div>
    </Layout>
  )
}
