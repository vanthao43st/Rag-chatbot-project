import os
from app.core.utils import log_step
from configs.config import DATA_PATH
from .docx_loader import load_docx_documents
from .pdf_loader import load_pdf_documents
from .text_loader import load_text_documents

def load_documents(path: str = DATA_PATH):
    if os.path.isdir(path):
        documents = []
        documents.extend(load_pdf_documents(path))
        documents.extend(load_docx_documents(path))
        documents.extend(load_text_documents(path))
        return documents

    if path.endswith(".pdf"):
        return load_pdf_documents(path)
    if path.endswith(".docx") or path.endswith(".doc"):
        return load_docx_documents(path)
    if path.endswith(".txt"):
        return load_text_documents(path)

    log_step("Loader Factory", f"Định dạng tệp không được hỗ trợ: {path}")
    return []