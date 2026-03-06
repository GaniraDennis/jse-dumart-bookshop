'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface MpesaPaymentProps {
  amount: number
  phoneNumber: string
  orderNumber: string
  onSuccess?: (checkoutRequestId: string) => void
  onError?: (error: string) => void
  isLoading?: boolean
}

export function MpesaPayment({
  amount,
  phoneNumber,
  orderNumber,
  onSuccess,
  onError,
  isLoading = false,
}: MpesaPaymentProps) {
  const [localLoading, setLocalLoading] = useState(false)
  const [promptSent, setPromptSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      setLocalLoading(true)
      setError(null)

      console.log('[v0] Initiating M-Pesa payment for:', { amount, phoneNumber, orderNumber })

      const response = await fetch('/api/payments/initiate-mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          amount,
          orderNumber,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Payment initiation failed')
      }

      const data = await response.json()

      console.log('[v0] M-Pesa response:', data)

      if (data.CheckoutRequestID) {
        setPromptSent(true)
        onSuccess?.(data.CheckoutRequestID)
      } else {
        throw new Error(data.ResponseDescription || 'Payment failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
      console.error('[v0] Payment error:', err)
    } finally {
      setLocalLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 border border-red-200">
          {error}
        </div>
      )}

      {promptSent && (
        <div className="rounded-lg bg-green-50 p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fa-solid fa-check text-lg text-green-600"></i>
            </div>
            <div>
              <p className="font-semibold text-green-900">M-Pesa Prompt Sent</p>
              <p className="text-sm text-green-700">Check your phone for the payment prompt at {phoneNumber}</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handlePayment}
        disabled={localLoading || isLoading || promptSent}
        className="w-full"
        size="lg"
      >
        {localLoading || isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending M-Pesa Prompt...
          </div>
        ) : promptSent ? (
          'M-Pesa Prompt Sent'
        ) : (
          `Pay KES ${amount.toLocaleString()} via M-Pesa`
        )}
      </Button>

      <p className="text-xs text-gray-600 text-center">
        You will receive an M-Pesa prompt on your phone. Enter your M-Pesa PIN to complete the payment.
      </p>
    </div>
  )
}
