import axios from 'axios'
import { orderValues } from './orderValues'

const orderIntialization = (values: any, AllcartItems: any) => {
  return axios.post('/api/orders', {
    ...orderValues(values, 'card'),
    cart: [...AllcartItems],
  })
}

export default orderIntialization
