import { NextResponse } from 'next/server'
import { getQuotes, transformNotionToQuotes } from '@/lib/notion'

// 견적서 목록 조회
export async function GET() {
  try {
    const pages = await getQuotes()
    const quotes = await transformNotionToQuotes(pages)

    return NextResponse.json({
      success: true,
      data: quotes,
      count: quotes.length,
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 에러'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
