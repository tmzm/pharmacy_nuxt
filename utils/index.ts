import type { ThemeSwitcherTheme } from '@/types/types'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

export const themes: ThemeSwitcherTheme[] = [
  {
    name: 'light',
    icon: 'ri-sun-line'
  },
  {
    name: 'dark',
    icon: 'ri-moon-clear-line'
  }
]

export const avatars = [
  { text: 'avatar1', avatar: avatar1 },
  { text: 'avatar2', avatar: avatar2 },
  { text: 'avatar3', avatar: avatar3 },
  { text: 'avatar4', avatar: avatar4 },
  { text: 'avatar5', avatar: avatar5 },
  { text: 'avatar6', avatar: avatar6 },
  { text: 'avatar7', avatar: avatar7 },
  { text: 'avatar8', avatar: avatar8 }
  // { text: 'avatar9', avatar: avatar9 }
  // { text: 'avatar10' },
  // { text: 'avatar11' },
  // { text: 'avatar12' },
  // { text: 'avatar13' },
  // { text: 'avatar14' },
  // { text: 'avatar15' }
]

export const productHeaders = [
  {
    title: 'Actions',
    key: 'id'
  },
  {
    title: 'Scientific Name',
    key: 'scientific_name'
  },
  {
    title: 'Commercial Name',
    key: 'commercial_name'
  },
  {
    title: 'Company Name',
    key: 'company_name'
  },
  {
    title: 'Price',
    key: 'price'
  },
  {
    title: 'Quantity',
    key: 'is_quantity'
  },
  {
    title: 'Expiration',
    key: 'expiration'
  },
  {
    title: 'Created At',
    key: 'created_at'
  },
  {
    title: 'Updated At',
    key: 'updated_at'
  },
  {
    title: 'Categories',
    key: 'category_products'
  }
]

export const orderHeaders = [
  {
    title: 'Actions',
    key: 'id'
  },
  {
    title: 'User',
    key: 'user_id'
  },
  {
    title: 'Status',
    key: 'status'
  },
  {
    title: 'Payment Status',
    key: 'payment_status'
  },
  {
    title: 'Total Price',
    key: 'total_price'
  },
  {
    title: 'created at',
    key: 'created_at'
  },
  {
    title: 'updated at',
    key: 'updated_at'
  },
  {
    title: 'Products',
    key: 'order_items'
  }
]
