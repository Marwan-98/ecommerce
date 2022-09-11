export interface Product {
  id: string
  name: string
  href: string
  price: string
  availableQty: number
  images: Image[]
  colors: Color[]
  sizes: Size[] 
  imageSrc: string
  imageAlt: string
  description: string
  highlights: string[]
  details: string
  collectionId: string
}

export interface CartItem extends Product {
  quantity: number,
  size: string,
  color: string
}

export interface formValues {
  'email-address': string,
  'first-name': string,
  'last-name': string,
  'company': string,
  'address': string,
  'apartment': string,
  'city': string,
  'country': string,
  'region': string,
  'payment-type': string,
  'postal-code': string,
  'phone': string,
  'card-number': string,
  'name-on-card': string,
  'expiration-date': string,
  'cvc': string
}

export type Image = {
  productId?: string,
  src: string,
  alt: string
}

export type Color = {
  id: string,
  name: string,
  class: string,
  selectedClass: string
}

export type ItemColors = {
  id: string,
  productId: string,
  colorId: string
}

export type Size = {
  id: string,
  name: string,
  inStock: boolean
}

export type ItemSize = {
  id: string,
  productId: string,
  sizeId: string,
}

export type HighLight = {
  id: string,
  highLight: string
}

export type ItemHighlights = {
  id: string,
  productId: string,
  highlightId: string
}

export type Collection = {
  id: string,
  name: string
  href: string,
  imageSrc: string,
  imageAlt: string
}

export type Category = {
  name: string
  featured: Product[]
}

export type DeliveryMethod = {
  id: number
  title: string
  turnaround: string
  price: string
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