import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AppStateType, CartItem, Product } from 'types'

interface CartSlice {
    items: AppStateType["cart"] | [],
    total: number
}

const initialState: CartSlice = {
    items: [],
    total: 0
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItem>) => {
            state.items = [...state.items, action.payload]
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        changeQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            let accumulated = 0;
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    accumulated += +item.price.replace(/[^0-9.]/g, "") * action.payload.quantity
                    return {
                        ...item,
                        quantity: action.payload.quantity
                    }
                } else {
                    accumulated += +item.price.replace(/[^0-9.]/g, "") * item.quantity
                    return item
                }
            })
            // state.items.map((item) => accumulated += +item.price.replace(/[^0-9.]/g, "") * item.quantity)
            state.total = accumulated
        },
        addToTotal: (state, action: PayloadAction<number>) => {
            state.total += action.payload
        }
    },
})

export const { addToTotal, changeQuantity, addProduct, removeProduct } = CartSlice.actions

export const cartItems = (state: RootState) => state.cart.items
export const cartTotal = (state: RootState) => state.cart.total

export default CartSlice.reducer