"use client"

import { Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onOpenUpload: () => void
}

export function EmptyState({ onOpenUpload }: EmptyStateProps) {
  return (
    <div className="flex h-full">
      <div className="w-[400px] border-r-2 border-blue-200 bg-gradient-to-b from-white to-blue-50 p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Nguồn</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" />
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" />
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" />
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" />
            </svg>
          </Button>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onOpenUpload}
            className="gap-2 rounded-2xl px-10 py-7 text-base bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border-2 border-blue-400"
          >
            <Plus className="h-5 w-5" />
            <span className="font-bold">Thêm</span>
          </Button>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-sky-100 p-6 shadow-md border-2 border-blue-200">
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="mb-3 text-base font-bold text-foreground">Các nguồn đã lưu sẽ xuất hiện ở đây</h3>
          <p className="max-w-[280px] text-xs leading-relaxed text-muted-foreground">
            Nhấn vào "Thêm nguồn" ở trên để thêm tệp PDF, trang web, văn bản, video hoặc tệp âm thanh. Hoặc nhập một tệp
            trực tiếp từ Google Drive.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 px-6 py-4">
          <h2 className="text-lg font-bold text-foreground">Cuộc trò chuyện</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="3" r="1.5" fill="currentColor" />
              <circle cx="12" cy="8" r="1.5" fill="currentColor" />
              <circle cx="12" cy="13" r="1.5" fill="currentColor" />
            </svg>
          </Button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-100 to-sky-100 p-8 shadow-xl shadow-blue-500/20 border-2 border-blue-200">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-600"
            >
              <path
                d="M12 5V19M12 5L7 10M12 5L17 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-6 text-2xl font-bold text-balance text-foreground">Thêm một nguồn để bắt đầu</h3>
          <Button
            onClick={onOpenUpload}
            className="rounded-2xl px-10 py-7 text-base bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 font-bold border-2 border-blue-400"
          >
            Tải nguồn lên
          </Button>
        </div>

        <div className="border-t-2 border-blue-200 bg-card p-4">
          <div className="flex items-center gap-3 rounded-2xl border-3 border-blue-300 bg-gradient-to-r from-white to-blue-50 px-5 py-4 shadow-md hover:border-blue-400 transition-colors">
            <span className="flex-1 text-sm text-muted-foreground font-medium">Tải một nguồn lên để bắt đầu</span>
            <span className="rounded-full bg-blue-100 border-2 border-blue-200 px-4 py-1.5 text-xs font-bold text-blue-700">
              0 nguồn
            </span>
            <Button
              size="icon"
              className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-lg shadow-blue-500/30 transition-all border-2 border-blue-400"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="border-t-2 border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            NotebookLM có thể đưa ra thông tin không chính xác; hãy kiểm tra câu trả lời mà bạn nhận được.
          </p>
        </div>
      </div>
    </div>
  )
}
