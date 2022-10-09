import axios from 'axios'
import { orderValues } from './orderValues'

const orderIntialization = (values: any, AllcartItems: any) => {
  return axios.post(
    'https://ecommerce-jb6nt0gsg-marwan-98.vercel.app/api/orders',
    {
      ...orderValues(values, 'card'),
      cart: [...AllcartItems],
    }
  )
}

export default orderIntialization
