"use client"

import type React from "react"

import { useState } from "react"
import { Plus, FileText, Check, X, RefreshCw, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface DocumentViewProps {
  files: {
    name: string
    type: string
  }[]
  onDeleteFile: (index: number) => void
  onDeleteAllFiles: () => void
  onOpenUpload: () => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function DocumentView({ files, onDeleteFile, onDeleteAllFiles, onOpenUpload }: DocumentViewProps) {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<boolean[]>(files.map(() => false))
  const [hoveredFileIndex, setHoveredFileIndex] = useState<number | null>(null)
  const [isSelectAllHovered, setIsSelectAllHovered] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [showRefreshModal, setShowRefreshModal] = useState(false)

  const handleSelectAll = () => {
    const newValue = !selectAll
    setSelectAll(newValue)
    setSelectedFiles(files.map(() => newValue))
  }

  const handleDeleteFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    onDeleteFile(index)
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteAllFiles = (e: React.MouseEvent) => {
    e.stopPropagation()
    for (let i = files.length - 1; i >= 0; i--) {
      if (selectedFiles[i]) {
        onDeleteFile(i)
      }
    }
    setSelectAll(false)
    setSelectedFiles([])
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "Hello. I see you have provided sources that contain the details of a curriculum decision for a graduate program.\n\nThe sources are excerpts from a Decision (Quyết định) issued by the HIỆU TRƯỞNG TRƯỜNG ĐẠI HỌC CÔNG NGHỆ (Rector of the University of Engineering and Technology), which is a member of ĐẠI HỌC QUỐC GIA HÀ NỘI (Hanoi National University - ĐHQGHN).\n\nThis decision pertains to the issuance (adjustment) of the Master's training program (chương trình đào tạo trình độ thạc sĩ) for the field of Khoa học máy tính (Computer Science), bearing the industry code 8480101.\n\nThis curriculum document outlines several key aspects of the program, including:\n\n• Program Applicability: The adjusted curriculum applies to students enrolled starting from the 2024 intake of the University of Engineering and Technology.\n\n• Total Credits: The program requires accumulating a total of 61 tín chỉ (credits).",
    }

    setMessages([...messages, userMessage, assistantMessage])
    setInputValue("")
  }

  const handleRefreshClick = () => {
    setShowRefreshModal(true)
  }

  const handleRefreshContinue = () => {
    setMessages([])
    setShowRefreshModal(false)
  }

  const handleRefreshCancel = () => {
    setShowRefreshModal(false)
  }

  return (
    <div className="flex h-full" suppressHydrationWarning>
      <div
        className="w-[400px] border-r-2 border-blue-200 bg-gradient-to-b from-white to-blue-50"
        suppressHydrationWarning
      >
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

          <div className="flex justify-center">
            <Button
              onClick={onOpenUpload}
              className="gap-2 rounded-2xl px-10 py-7 text-base bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border-2 border-blue-400"
            >
              <Plus className="h-5 w-5" />
              <span className="font-bold">Thêm</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div
            className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gradient-to-r hover:from-blue-100 hover:to-sky-100 transition-all cursor-pointer border-2 border-transparent hover:border-blue-300"
            onMouseEnter={() => setIsSelectAllHovered(true)}
            onMouseLeave={() => setIsSelectAllHovered(false)}
          >
            <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} className="rounded-md" />
            <span className="text-sm font-semibold text-foreground">Select all sources</span>
            {isSelectAllHovered && selectedFiles.some((selected) => selected) ? (
              <button
                onClick={handleDeleteAllFiles}
                className="ml-auto rounded-full bg-red-100 border-2 border-red-300 p-1 hover:bg-red-200 transition-colors"
              >
                <X className="h-4 w-4 text-red-600" />
              </button>
            ) : (
              selectAll && (
                <div className="ml-auto rounded-full bg-blue-100 border-2 border-blue-300 p-1">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>
              )
            )}
          </div>

          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl px-3 py-3 mb-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-sky-100 transition-all cursor-pointer border-2 border-transparent hover:border-blue-300"
              onMouseEnter={() => setHoveredFileIndex(index)}
              onMouseLeave={() => setHoveredFileIndex(null)}
            >
              <Checkbox
                checked={selectedFiles[index]}
                onCheckedChange={(checked) => {
                  const newSelected = [...selectedFiles]
                  newSelected[index] = checked as boolean
                  setSelectedFiles(newSelected)
                  if (newSelected.every((selected) => selected)) {
                    setSelectAll(true)
                  } else {
                    setSelectAll(false)
                  }
                }}
                className="rounded-md"
              />
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-red-100 to-red-50 p-2.5 shadow-md border-2 border-red-200">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-foreground">{file.name}</span>
              </div>
              {hoveredFileIndex === index ? (
                <button
                  onClick={(e) => handleDeleteFile(e, index)}
                  className="ml-auto rounded-full bg-red-100 border-2 border-red-300 p-1 hover:bg-red-200 transition-colors"
                >
                  <X className="h-4 w-4 text-red-600" />
                </button>
              ) : (
                selectedFiles[index] && (
                  <div className="ml-auto rounded-full bg-blue-100 border-2 border-blue-300 p-1">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col" suppressHydrationWarning>
        <div className="flex items-center justify-between border-b-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 px-6 py-4">
          <h2 className="text-lg font-bold text-foreground">Cuộc trò chuyện</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefreshClick}
            className="h-9 w-9 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-3xl">
            {messages.length === 0 ? (
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
                <div className="flex-1">
                  <h1 className="mb-3 text-2xl font-bold text-balance text-foreground">Tổng quan</h1>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-sky-100 border-2 border-blue-300 px-5 py-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-sm font-bold text-blue-700">{files.length} nguồn</span>
                  </div>
                  <div className="rounded-2xl border-3 border-blue-300 bg-gradient-to-br from-blue-50 to-sky-50 p-6 text-sm leading-relaxed shadow-lg">
                    <p className="text-foreground/90">
                      Chào mừng bạn đến với hệ thống quản lý tài liệu thông minh! Bạn có thể tải lên các tài liệu PDF,
                      văn bản, hoặc các loại file khác để hệ thống phân tích và trả lời câu hỏi của bạn.
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          "Chào mừng bạn đến với hệ thống quản lý tài liệu thông minh! Bạn có thể tải lên các tài liệu PDF, văn bản, hoặc các loại file khác để hệ thống phân tích và trả lời câu hỏi của bạn.",
                        )
                      }
                      className="gap-2 rounded-xl border-3 border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors bg-white"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300"
                          : "bg-white border-2 border-blue-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{message.content}</p>
                      <div className="mt-3 flex justify-start">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(message.content)}
                          className="h-7 gap-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t-2 border-blue-200 bg-card p-4">
          <div className="flex items-center gap-3 rounded-2xl border-3 border-blue-300 bg-gradient-to-r from-white to-blue-50 px-5 py-4 shadow-md hover:border-blue-400 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              disabled={files.length === 0}
              placeholder="Bắt đầu nhập..."
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="rounded-full bg-gradient-to-r from-blue-100 to-sky-100 border-2 border-blue-300 px-4 py-1.5 text-xs font-bold text-blue-700">
              {files.length} nguồn
            </span>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={files.length === 0 || !inputValue.trim()}
              className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all border-2 border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-xl bg-gray-900 px-6 py-3 shadow-2xl border-2 border-gray-700">
            <p className="text-sm font-medium text-white">Copied to clipboard.</p>
          </div>
        </div>
      )}

      {showRefreshModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl bg-white p-8 shadow-2xl border-2 border-blue-200 max-w-md w-full mx-4">
            <p className="text-center text-base font-medium text-foreground mb-8">
              Are you sure you want to clear your chat history?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleRefreshCancel}
                className="rounded-xl px-8 py-6 border-2 border-gray-300 hover:bg-gray-50 transition-colors bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRefreshContinue}
                className="rounded-xl px-8 py-6 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-colors border-2 border-blue-400"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
