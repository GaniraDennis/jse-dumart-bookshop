import { NextRequest, NextResponse } from 'next/server'
import { initiateSTKPush } from '@/lib/supabase/mpesa'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, amount, orderNumber } = body

    if (!phoneNumber || !amount || !orderNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format phone number
    let formattedPhone = phoneNumber.toString().trim()
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1)
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone
    }

    console.log('[v0] Initiating M-Pesa payment:', { phoneNumber: formattedPhone, amount, orderNumber })

    const result = await initiateSTKPush(formattedPhone, amount, orderNumber)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[v0] Error initiating M-Pesa payment:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to initiate payment'
      },
      { status: 500 }
    )
  }
}
