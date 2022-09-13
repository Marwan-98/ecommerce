import { FormikProps } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import { DeliveryMethod, formValues } from 'types'
import ContactInfo from './contactInfo'
import DeliveryMethods from './deliveryMethods'
import PaymentInfo from './paymentInfo'
import ShippingInfo from './shippingInfo'

const ContactForm = ({
  formik,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  deliveryMethods,
}: {
  formik: FormikProps<formValues>
  selectedDeliveryMethod: Object
  setSelectedDeliveryMethod: Dispatch<SetStateAction<DeliveryMethod>>
  deliveryMethods: DeliveryMethod[]
}) => {
  return (
    <div>
      <ContactInfo formik={formik} />

      <ShippingInfo formik={formik} />

      <DeliveryMethods
        selectedDeliveryMethod={selectedDeliveryMethod}
        setSelectedDeliveryMethod={setSelectedDeliveryMethod}
        deliveryMethods={deliveryMethods}
      />

      <PaymentInfo formik={formik} />
    </div>
  )
}

export default ContactForm
