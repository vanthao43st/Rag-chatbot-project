from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from configs.config import DATA_PATH

def load_documents():
    loader = DirectoryLoader(DATA_PATH, glob="*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()
    print(f"Đã load {len(documents)} trang PDF.")
    return documents