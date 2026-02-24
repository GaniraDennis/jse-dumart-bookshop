import { supabase } from './client'

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  quantity: number
  unit_price: number
  product_name: string
  product_image?: string
  created_at: string
}

export interface Order {
  id: string
  user_id?: string
  order_number: string
  status: 'pending' | 'paid' | 'failed' | 'delivered' | 'cancelled'
  payment_method: 'mpesa' | 'cod'
  mpesa_transaction_id?: string
  mpesa_phone?: string
  total_amount: number
  delivery_fee: number
  shipping_address?: Record<string, any>
  notes?: string
  created_at: string
  updated_at: string
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()

  if (error) throw error
  return data[0] as Order
}

export async function getOrderByNumber(orderNumber: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('order_number', orderNumber)
    .single()

  if (error) throw error
  return data as Order & { order_items: OrderItem[] }
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (Order & { order_items: OrderItem[] })[]
}

export async function createOrderItems(items: Omit<OrderItem, 'id' | 'created_at'>[]) {
  const { data, error } = await supabase
    .from('order_items')
    .insert(items)
    .select()

  if (error) throw error
  return data as OrderItem[]
}

export async function updateOrderStatus(orderId: string, status: Order['status'], mpesaTransactionId?: string) {
  const updates: any = { status }
  if (mpesaTransactionId) {
    updates.mpesa_transaction_id = mpesaTransactionId
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()

  if (error) throw error
  return data[0] as Order
}

export async function getOrderWithItems(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', orderId)
    .single()

  if (error) throw error
  return data as Order & { order_items: OrderItem[] }
}
