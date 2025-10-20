import os
from dotenv import load_dotenv

load_dotenv()

DATA_PATH = "./data"

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
TOP_K = 3

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION = "pdf_chunks"

EMBEDDING_MODEL_NAME = "intfloat/multilingual-e5-base"
EMBEDDING_DIM = 768

GOOOEL_GEMINI_API_KEY = os.getenv("GOOOEL_GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.5-flash-preview-05-20"

BATCH_SIZE = 100    # Số lượng điểm để upsert mỗi lần