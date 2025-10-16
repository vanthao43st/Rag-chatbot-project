"use client"

import { useState } from "react"
import { Plus, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface DocumentViewProps {
  file: {
    name: string
    type: string
  }
}

export function DocumentView({ file }: DocumentViewProps) {
  const [selectAll, setSelectAll] = useState(true)
  const [fileSelected, setFileSelected] = useState(true)

  const handleSelectAll = () => {
    const newValue = !selectAll
    setSelectAll(newValue)
    setFileSelected(newValue)
  }

  return (
    <div className="flex h-full">
      <div className="w-[400px] border-r-2 border-blue-200 bg-gradient-to-b from-white to-blue-50">
        <div className="border-b-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 p-6">
          <div className="mb-6 flex items-center justify-between">
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

          <div className="flex gap-2">
            <Button className="gap-2 rounded-2xl px-6 py-5 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 border-2 border-blue-400">
              <Plus className="h-4 w-4" />
              <span className="font-bold">Thêm</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-2xl px-6 py-5 border-3 border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M11 8L8 11L5 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold">Khám phá</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gradient-to-r hover:from-blue-100 hover:to-sky-100 transition-all cursor-pointer border-2 border-transparent hover:border-blue-300">
            <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} className="rounded-md" />
            <span className="text-sm font-semibold text-foreground">Select all sources</span>
            {selectAll && (
              <div className="ml-auto rounded-full bg-blue-100 border-2 border-blue-300 p-1">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gradient-to-r hover:from-blue-100 hover:to-sky-100 transition-all cursor-pointer border-2 border-transparent hover:border-blue-300">
            <Checkbox
              checked={fileSelected}
              onCheckedChange={(checked) => {
                setFileSelected(checked as boolean)
                if (!checked) setSelectAll(false)
              }}
              className="rounded-md"
            />
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-red-100 to-red-50 p-2.5 shadow-md border-2 border-red-200">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-foreground">{file.name}</span>
            </div>
            {fileSelected && (
              <div className="ml-auto rounded-full bg-blue-100 border-2 border-blue-300 p-1">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
            )}
          </div>
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

        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-start gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 p-5 shadow-xl shadow-blue-500/40 border-2 border-blue-400">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="mb-3 text-2xl font-bold text-balance text-foreground">
                  Learning Transferable Visual Models From Natural Language Supervision
                </h1>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-sky-100 border-2 border-blue-300 px-5 py-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-sm font-bold text-blue-700">1 nguồn</span>
                </div>
                <div className="rounded-2xl border-3 border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50 p-6 text-sm leading-relaxed shadow-lg">
                  <p className="text-foreground/90">
                    Bản trích dẫn từ tài liệu "OpenAI_CLIP model.pdf" cung cấp một cái nhìn tổng quan về mô hình CLIP,
                    một hệ thống học biểu diễn hình ảnh từ ngôn ngữ tự nhiên, được huấn luyện để thực hiện nhiệm vụ phân
                    loại <strong className="text-blue-700">zero-shot</strong> và{" "}
                    <strong className="text-blue-700">transfer learning</strong> (học chuyển giao). Các tác giả thảo
                    luận về <strong className="text-blue-700">hiệu quả tính toán</strong> vượt trội của mục tiêu phân
                    loại (contrastive objective) của CLIP so với các phương pháp mô hình ngôn ngữ dựa trên dự đoán từ
                    chính xác. Các kết quả thực nghiệm chỉ ra rằng CLIP đạt được{" "}
                    <strong className="text-blue-700">độ chính xác cạnh tranh</strong> với các mô hình được giám sát
                    hoàn toàn trên nhiều bộ dữ liệu, và đặc biệt thể hiện{" "}
                    <strong className="text-blue-700">tính mạnh mẽ cao hơn</strong> trước sự thay đổi phân phối dữ liệu
                    từ nhiên so với các mô hình ImageNet tiêu chuẩn.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl border-3 border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors bg-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold">Lưu vào ghi chú</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl border-3 border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors bg-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-blue-200 bg-card p-4">
          <div className="flex items-center gap-3 rounded-2xl border-3 border-blue-300 bg-gradient-to-r from-white to-blue-50 px-5 py-4 shadow-md hover:border-blue-400 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              placeholder="Bắt đầu nhập..."
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
            <span className="rounded-full bg-gradient-to-r from-blue-100 to-sky-100 border-2 border-blue-300 px-4 py-1.5 text-xs font-bold text-blue-700">
              1 nguồn
            </span>
            <Button
              size="icon"
              className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all border-2 border-blue-400"
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
