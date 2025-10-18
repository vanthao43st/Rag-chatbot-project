"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadModalProps {
  onClose: () => void
  onFileUpload: (file: File) => void
}

export function UploadModal({ onClose, onFileUpload }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl bg-card shadow-2xl border-2 border-primary/20">
        <div className="flex items-center justify-between border-b-2 border-primary/20 bg-gradient-to-r from-blue-50 to-sky-100 px-8 py-6 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-500/30">
              <svg
                width="24"
                height="24"
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
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              NotebookLM
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-8">
          <h3 className="mb-4 text-2xl font-bold text-foreground">Thêm nguồn</h3>

          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            Các nguồn giúp NotebookLM đưa ra câu trả lời dựa trên những thông tin quan trọng nhất đối với bạn. (Ví dụ:
            kế hoạch tiếp thị, nội dung khoá học, ghi chú nghiên cứu, bản chép lời cuộc họp, tài liệu bán hàng, v.v.)
          </p>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-3xl border-3 border-dashed p-16 text-center transition-all duration-300 ${
              isDragging
                ? "border-blue-500 bg-gradient-to-br from-blue-100 to-sky-100 scale-[1.02] shadow-xl shadow-blue-500/20"
                : "border-blue-300 bg-gradient-to-br from-blue-50/50 to-sky-50/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
            }`}
          >
            <div className="mb-6 flex justify-center">
              <div
                className={`rounded-2xl p-6 transition-all duration-300 ${
                  isDragging
                    ? "bg-gradient-to-br from-blue-500 to-sky-500 shadow-xl shadow-blue-500/40 scale-110"
                    : "bg-gradient-to-br from-blue-100 to-sky-100"
                }`}
              >
                <Upload className={`h-12 w-12 transition-colors ${isDragging ? "text-white" : "text-blue-600"}`} />
              </div>
            </div>
            <h4 className="mb-3 text-xl font-bold text-foreground">Tải nguồn lên</h4>
            <p className="mb-6 text-sm text-muted-foreground">
              Kéo và thả hoặc{" "}
              <button
                onClick={handleChooseFile}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                chọn tệp
              </button>{" "}
              để tải lên
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border-2 border-blue-200 px-5 py-2.5 text-xs font-semibold text-blue-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Hỗ trợ: PDF, txt, Markdown, Âm thanh (mp3)
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.txt,.md,.mp3,.wav"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
