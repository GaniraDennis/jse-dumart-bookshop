import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 0 // Never cache health checks

export async function GET() {
  const startTime = Date.now()
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
  }

  try {
    // Check database connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Missing Supabase credentials',
          ...checks,
        },
        { status: 503 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test database connection
    const { data, error } = await supabase
      .from('products')
      .select('count()', { count: 'exact' })
      .limit(1)

    if (error) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection failed',
          error: error.message,
          ...checks,
        },
        { status: 503 }
      )
    }

    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: 'healthy',
      message: 'All systems operational',
      responseTime: `${responseTime}ms`,
      database: 'connected',
      productsCount: data?.[0]?.count || 0,
      ...checks,
    })
  } catch (error) {
    const responseTime = Date.now() - startTime

    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: `${responseTime}ms`,
        ...checks,
      },
      { status: 503 }
    )
  }
}
