import { NextRequest, NextResponse } from 'next/server'
import { updateOrderStatus } from '@/lib/supabase/orders'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('[v0] M-Pesa callback received:', body)

    // Verify callback is from Daraja API (in production, validate the signature)
    const result = body.Body?.stkCallback

    if (!result) {
      return NextResponse.json(
        { ResultCode: 0, ResultDesc: 'Success' },
        { status: 200 }
      )
    }

    const resultCode = result.ResultCode
    const resultDesc = result.ResultDesc
    const checkoutRequestID = result.CheckoutRequestID

    // Extract transaction data
    let transactionData: any = {}
    if (result.CallbackMetadata?.Item) {
      result.CallbackMetadata.Item.forEach((item: any) => {
        transactionData[item.Name] = item.Value
      })
    }

    console.log('[v0] M-Pesa result:', { resultCode, resultDesc, transactionData })

    if (resultCode === 0) {
      // Payment successful
      const mpesaTransactionId = transactionData['MpesaReceiptNumber']
      const amount = transactionData['Amount']
      const phoneNumber = transactionData['PhoneNumber']

      // Find and update order
      // Note: In production, you'd need to match the checkout request ID to an order
      // For now, this is a placeholder
      console.log('[v0] Payment successful:', { mpesaTransactionId, amount, phoneNumber })

      return NextResponse.json(
        { ResultCode: 0, ResultDesc: 'Success' },
        { status: 200 }
      )
    } else {
      // Payment failed
      console.log('[v0] Payment failed:', resultDesc)
      return NextResponse.json(
        { ResultCode: 0, ResultDesc: 'Success' },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('[v0] Error processing M-Pesa callback:', error)
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: 'Error' },
      { status: 500 }
    )
  }
}
