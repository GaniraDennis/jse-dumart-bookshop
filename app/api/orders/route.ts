import { NextRequest, NextResponse } from 'next/server'
import { createOrder, createOrderItems } from '@/lib/supabase/orders'

function generateOrderNumber() {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `ORD-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, items, shipping_address, payment_method, mpesa_phone, notes } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      )
    }

    // Calculate total
    const total_amount = items.reduce((sum: number, item: any) => {
      return sum + item.unit_price * item.quantity
    }, 0)

    // Create order
    const order = await createOrder({
      user_id,
      order_number: generateOrderNumber(),
      status: 'pending',
      payment_method,
      mpesa_phone,
      total_amount,
      delivery_fee: 0,
      shipping_address,
      notes,
    })

    // Create order items
    const orderItems = await createOrderItems(
      items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        product_name: item.product_name,
        product_image: item.product_image,
      }))
    )

    return NextResponse.json(
      {
        order,
        items: orderItems,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
