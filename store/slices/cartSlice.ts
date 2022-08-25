import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AppStateType, CartItem } from 'types'

interface CartSlice {
    items: AppStateType["cart"] | [],
    total: number
}

const initialState: CartSlice = {
    items: [{
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        size: "default",
        availableQty: 4,
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt:
            'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        size: "default",
        availableQty: 4,
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    }],
    total: 0
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
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

export const { addToTotal, changeQuantity, removeProduct } = CartSlice.actions

export const cartItems = (state: RootState) => state.cart.items
export const cartTotal = (state: RootState) => state.cart.total

export default CartSlice.reducer