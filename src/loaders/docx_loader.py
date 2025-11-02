from langchain_community.document_loaders import DirectoryLoader, UnstructuredWordDocumentLoader
from app.core.utils import log_step

def load_docx_documents(path:str):
    if path.endswith(".docx") or path.endswith(".doc"):
        loader = UnstructuredWordDocumentLoader(path)
        documents = loader.load()
        log_step("Docx Loader", f"Đã load {len(documents)} trang DOCX từ {path}.")
        return documents

    documents = []
    loaders = [
        DirectoryLoader(path, glob="*.docx", loader_cls=UnstructuredWordDocumentLoader),
        DirectoryLoader(path, glob="*.doc", loader_cls=UnstructuredWordDocumentLoader)
    ]
    for loader in loaders:
        documents.extend(loader.load())

    log_step("Docx Loader", f"Đã load {len(documents)} trang DOCX từ thư mục {path}.")

    return documents