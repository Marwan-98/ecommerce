import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AppStateType, Product } from 'types'

interface ProductsState {
  items: AppStateType["products"] | [],
  product: Product | undefined
}

const initialState: ProductsState = {
  items: [],
  product: undefined
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload
    },
    setProduct: (state, action: PayloadAction<Product | undefined>) => {
      state.product = action.payload
  }
  },
})

export const { setProducts, setProduct } = productsSlice.actions

export const products = (state: RootState) => state.products.items
export const product = (state: RootState) => state.products.product

export default productsSlice.reducer