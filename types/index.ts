export interface Product {
  id: number
  name: string
  href: string
  color: string
  price: string
  availableQty: number
  images: Image[]
  colors: []
  sizes: []
  imageSrc: string
  imageAlt: string
  description: string
  highlights: string[]
  details: string
}

export interface CartItem extends Product {
  quantity: number,
  size: string
}

export type Image = {
  productId?: string,
  src: string,
  alt: string
}

export type Color = {
  name: string,
  class: string,
  selectedClass: string
}

export type Size = {
  name: string,
  inStock: boolean
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Page = {
    name: string;
    href: string;
}
export type Navigation = {
  categories: Category[]
}