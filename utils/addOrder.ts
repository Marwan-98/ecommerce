import axios from 'axios'
import { orderValues } from './orderValues'

const addOrder = (
  values: any,
  selectedDeliveryMethod: any,
  AllcartItems: any
) => {
  return axios.post('/api/orderConfirm', {
    ...orderValues(values, 'user'),
    deliveryMethod: selectedDeliveryMethod.title,
    cart: [...AllcartItems],
  })
}

export default addOrder
