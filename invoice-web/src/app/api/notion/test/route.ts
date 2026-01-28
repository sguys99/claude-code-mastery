import { NextResponse } from 'next/server'
import { testNotionConnection } from '@/lib/notion/client'

export async function GET() {
  const result = await testNotionConnection()

  if (result.success) {
    return NextResponse.json(result, { status: 200 })
  }

  return NextResponse.json(result, { status: 500 })
}
