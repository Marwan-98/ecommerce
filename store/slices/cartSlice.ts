import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AppStateType, CartItem, Product } from 'types'
import { toNumber } from 'utils/toNumber'

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
            let found = false;
            state.items = state.items.map(item => {
                if(item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size) {
                    found = true;
                    return {...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
            if(!found) {
                state.items = [...state.items, action.payload]
            }
        },
        removeProduct: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.filter(item => {
                if (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size) {
                    return false
                } else {
                    return true
                }
            });
        },
        changeQuantity: (state, action: PayloadAction<{ id: string,color: string, size: string, quantity: number }>) => {
            let accumulated = 0;
            state.items = state.items.map(item => {
                if (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size) {
                    accumulated += +toNumber(item.price) * action.payload.quantity
                    return {
                        ...item,
                        quantity: action.payload.quantity
                    }
                } else {
                    accumulated += +toNumber(item.price) * item.quantity
                    return item
                }
            })
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