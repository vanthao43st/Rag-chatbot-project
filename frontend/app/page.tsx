"use client"

import { useState } from "react"
import { EmptyState } from "@/components/empty-state"
import { UploadModal } from "@/components/upload-modal"
import { DocumentView } from "@/components/document-view"

export default function Home() {
  const [view, setView] = useState<"empty" | "upload" | "document">("empty")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string }[]>([])

  const handleOpenUpload = () => {
    setView("upload")
  }

  const handleCloseUpload = () => {
    setView(uploadedFiles.length > 0 ? "document" : "empty")
  }

  const handleFileUpload = (file: File) => {
    setUploadedFiles((prev) => [...prev, { name: file.name, type: file.type }])
    setView("document")
  }

  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index)
      if (newFiles.length === 0) {
        setView("empty")
      }
      return newFiles
    })
  }

  const handleDeleteAllFiles = () => {
    setUploadedFiles([])
    setView("empty")
  }

  return (
    <div className="h-screen w-full">
      {view === "empty" && <EmptyState onOpenUpload={handleOpenUpload} />}
      {view === "upload" && <UploadModal onClose={handleCloseUpload} onFileUpload={handleFileUpload} />}
      {view === "document" && uploadedFiles.length > 0 && (
        <DocumentView
          files={uploadedFiles}
          onDeleteFile={handleDeleteFile}
          onDeleteAllFiles={handleDeleteAllFiles}
          onOpenUpload={handleOpenUpload}
        />
      )}
    </div>
  )
}
