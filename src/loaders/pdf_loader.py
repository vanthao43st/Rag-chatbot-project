from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from app.core.utils import log_step
from configs.config import DATA_PATH

def load_pdf_documents(path:str=DATA_PATH):
    if path.endswith(".pdf"):
        loader = PyPDFLoader(path)
        documents = loader.load()
        log_step("PDF Loader", f"Đã load {len(documents)} trang PDF từ {path}.")
        return documents

    loader = DirectoryLoader(path, glob="*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()
    log_step("PDF Loader", f"Đã load {len(documents)} trang PDF từ thư mục {path}.")
    return documents