import { NextResponse } from 'next/server'
import { getQuoteById, transformNotionToQuote } from '@/lib/notion'

interface RouteParams {
  params: Promise<{ id: string }>
}

// 단일 견적서 조회
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    const page = await getQuoteById(id)

    if (!page) {
      return NextResponse.json(
        { success: false, error: '견적서를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    const quote = await transformNotionToQuote(page)

    return NextResponse.json({
      success: true,
      data: quote,
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
