export interface User {
  created_at: Date
  updated_at: Date
  id: number
  phone_number: string
  name: string
  device_key?: string
  role: string
  avatar?: string
  isAcceptedAsAdmin: boolean
}

export interface Product {
  created_at: Date
  updated_at: Date
  id: number
  scientific_name: string
  commercial_name: string
  company_name: string
  price: number
  expiration: Date
  quantity: number
  is_quantity: boolean
  category_products: CategoryProduct[]
  description: string
  image: string
}

export interface CategoryProduct {
  created_at: Date
  updated_at: Date
  id: number
  category: Category
}

export interface Category {
  created_at: Date
  updated_at: Date
  id: number
  name: string
}

export interface Order {
  created_at: Date
  updated_at: Date
  id: number
  name: string
  status: string
  payment_status: boolean
  user_id: number
  user: User
  total_price: number
  order_items: OrderItem[]
  is_prescription: boolean
  accepted_by_user: boolean
}

export interface OrderItem {
  created_at: Date
  updated_at: Date
  id: number
  product_id: number
  product: Product
  order_id: number
  quantity: number
}

export interface Prescription {
  created_at: Date
  updated_at: Date
  id: number
  order: Order
  user: User
  image: string
  description: string
}
