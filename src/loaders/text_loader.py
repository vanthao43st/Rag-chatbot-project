from langchain_community.document_loaders import DirectoryLoader, TextLoader
from app.core.utils import log_step
from configs.config import DATA_PATH

def load_text_documents(path:str):
    if path.endswith(".txt"):
        loader = TextLoader(path, encoding="utf-8")
        documents = loader.load()
        log_step("Text Loader", f"Đã load {len(documents)} trang văn bản từ {path}.")
        return documents

    loader = DirectoryLoader(path, glob="*.txt", loader_cls=TextLoader, loader_kwargs={"encoding": "utf-8"})
    documents = loader.load()
    log_step("Text Loader", f"Đã load {len(documents)} trang văn bản từ thư mục {path}.")
    return documents