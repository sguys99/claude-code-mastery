import { NextResponse } from 'next/server'
import { getNotionClient, getDatabaseId } from '@/lib/notion/client'

// 데이터베이스 스키마 조회 (개발용)
export async function GET() {
  try {
    const client = getNotionClient()
    const databaseId = getDatabaseId()

    const database = await client.databases.retrieve({
      database_id: databaseId,
    })

    // 속성 정보만 추출
    const properties = 'properties' in database ? database.properties : {}

    return NextResponse.json({
      success: true,
      properties: Object.entries(properties).map(([name, prop]) => ({
        name,
        type: prop.type,
      })),
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
