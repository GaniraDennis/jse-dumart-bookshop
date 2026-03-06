/**
 * M-Pesa Integration Service
 * Handles M-Pesa STK Push and payment confirmations
 */

interface STKPushPayload {
  BusinessShortCode: string
  Password: string
  Timestamp: string
  TransactionType: string
  Amount: string
  PartyA: string
  PartyB: string
  PhoneNumber: string
  CallBackURL: string
  AccountReference: string
  TransactionDesc: string
}

/**
 * Generate the password for M-Pesa authentication
 */
function generateMpesaPassword(shortCode: string, passkey: string, timestamp: string): string {
  const str = shortCode + passkey + timestamp
  const encodedStr = Buffer.from(str).toString('base64')
  return encodedStr
}

/**
 * Get M-Pesa access token
 */
export async function getMpesaAccessToken(): Promise<string> {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET

    if (!consumerKey || !consumerSecret) {
      console.error('[v0] Missing M-Pesa credentials')
      throw new Error('Missing M-Pesa Consumer Key or Consumer Secret')
    }

    console.log('[v0] Requesting M-Pesa access token...')

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const response = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[v0] Token request failed:', response.status, errorText)
      throw new Error(`Failed to get M-Pesa access token: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('[v0] Access token obtained successfully')
    return data.access_token
  } catch (error) {
    console.error('[v0] Error getting M-Pesa access token:', error)
    throw error
  }
}

/**
 * Initiate STK Push request
 */
export async function initiateSTKPush(
  phoneNumber: string,
  amount: number,
  orderReference: string
): Promise<{
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}> {
  try {
    console.log('[v0] Initiating M-Pesa STK Push for:', { phoneNumber, amount, orderReference })
    
    const passkey = process.env.MPESA_PASSKEY
    if (!passkey) {
      throw new Error('M-Pesa pass key not configured')
    }
    
    const accessToken = await getMpesaAccessToken()
    const timestamp = new Date().toISOString().replace(/[:-]/g, '').slice(0, 14)
    const shortCode = process.env.MPESA_SHORTCODE || '7815771'

    console.log('[v0] M-Pesa config:', { shortCode, timestamp })

    const password = generateMpesaPassword(shortCode, passkey, timestamp)

    const payload: STKPushPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.floor(amount).toString(),
      PartyA: phoneNumber.replace(/^0/, '254'), // Convert to international format
      PartyB: shortCode,
      PhoneNumber: phoneNumber.replace(/^0/, '254'),
      CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/mpesa-callback`,
      AccountReference: orderReference,
      TransactionDesc: 'JSEdumart Order Payment',
    }

    console.log('[v0] STK Push payload:', { ...payload, Password: '***' })

    const response = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[v0] M-Pesa API error response:', errorText)
      throw new Error(`M-Pesa API failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    console.log('[v0] STK Push response:', {
      CheckoutRequestID: data.CheckoutRequestID,
      ResponseCode: data.ResponseCode,
      ResponseDescription: data.ResponseDescription,
    })

    if (data.ResponseCode !== '0') {
      console.error('[v0] M-Pesa error response:', data)
      throw new Error(data.ResponseDescription || 'M-Pesa request failed')
    }

    console.log('[v0] STK Push successful! CheckoutRequestID:', data.CheckoutRequestID)

    return data
  } catch (error) {
    console.error('[v0] Error initiating STK Push:', error)
    throw error
  }
}

/**
 * Check STK Push status
 */
export async function checkSTKStatus(checkoutRequestId: string): Promise<{
  ResponseCode: string
  ResponseDescription: string
  ResultCode?: string
  ResultDesc?: string
}> {
  try {
    const accessToken = await getMpesaAccessToken()
    const timestamp = new Date().toISOString().replace(/[:-]/g, '').slice(0, -5)
    const shortCode = process.env.MPESA_SHORTCODE!
    const passkey = process.env.MPESA_PASSKEY!

    const password = generateMpesaPassword(shortCode, passkey, timestamp)

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }

    const response = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error('[v0] Error checking STK status:', error)
    throw error
  }
}
