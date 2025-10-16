"use client"

import { useState } from "react"
import { EmptyState } from "@/components/empty-state"
import { UploadModal } from "@/components/upload-modal"
import { DocumentView } from "@/components/document-view"

export default function Home() {
  const [view, setView] = useState<"empty" | "upload" | "document">("empty")
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: string } | null>(null)

  const handleOpenUpload = () => {
    setView("upload")
  }

  const handleCloseUpload = () => {
    setView("empty")
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile({ name: file.name, type: file.type })
    setView("document")
  }

  return (
    <div className="h-screen w-full">
      {view === "empty" && <EmptyState onOpenUpload={handleOpenUpload} />}
      {view === "upload" && <UploadModal onClose={handleCloseUpload} onFileUpload={handleFileUpload} />}
      {view === "document" && uploadedFile && <DocumentView file={uploadedFile} />}
    </div>
  )
}
