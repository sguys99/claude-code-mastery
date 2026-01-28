'use client'

import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface PdfDownloadButtonProps {
  quoteNumber: string
  contentId: string
}

export function PdfDownloadButton({
  quoteNumber,
  contentId,
}: PdfDownloadButtonProps) {
  const handleDownload = useCallback(() => {
    const element = document.getElementById(contentId)
    if (!element) {
      console.error('견적서 요소를 찾을 수 없습니다')
      return
    }

    // 프린트 전용 스타일 생성
    const printStyles = document.createElement('style')
    printStyles.id = 'print-styles'
    printStyles.textContent = `
      @media print {
        @page {
          size: A4;
          margin: 15mm;
        }

        body * {
          visibility: hidden;
        }

        #${contentId}, #${contentId} * {
          visibility: visible;
        }

        #${contentId} {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background-color: white !important;
          color: black !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        /* 모든 요소에 기본 색상 적용 */
        #${contentId} * {
          color: #0a0a0a !important;
          background-color: white !important;
          border-color: #e5e5e5 !important;
        }

        /* 테이블 스타일 */
        #${contentId} table {
          width: 100%;
          border-collapse: collapse;
        }

        #${contentId} th,
        #${contentId} td {
          padding: 8px;
          text-align: left;
        }

        /* 헤더, 푸터 숨김 */
        header, footer, nav {
          display: none !important;
        }

        /* 버튼 영역 숨김 */
        button {
          display: none !important;
        }
      }
    `

    document.head.appendChild(printStyles)

    // 프린트 다이얼로그 열기
    window.print()

    // 프린트 후 스타일 제거
    setTimeout(() => {
      const styles = document.getElementById('print-styles')
      if (styles) {
        document.head.removeChild(styles)
      }
    }, 1000)
  }, [contentId])

  return (
    <Button size="sm" onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      PDF 다운로드
    </Button>
  )
}
