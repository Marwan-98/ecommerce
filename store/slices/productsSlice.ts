import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AppStateType, Product } from 'types'

interface ProductsState {
  items: AppStateType["products"] | []
}

const initialState: ProductsState = {
  items: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload
    }
  },
})

export const { setProducts } = productsSlice.actions

export const products = (state: RootState) => state.products.items

export default productsSlice.reducer