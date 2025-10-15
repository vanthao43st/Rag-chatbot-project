import os
from dotenv import load_dotenv

load_dotenv()

DATA_PATH = "./data"

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

QDRANT_URL = "https://f3427648-3502-4e26-9ec1-df3e58b45ce1.us-east4-0.gcp.cloud.qdrant.io:6333"
QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.dRyQpoqveewzO3swhfU_R09HnT77Cq2d39rLVjytRrk"
QDRANT_COLLECTION = "pdf_chunks"

EMBEDDING_MODEL = "intfloat/multilingual-e5-base"
EMBEDDING_DIM = 768

GEMINI_API_KEY = os.getenv("GOOOEL_GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.5-flash-preview-05-20"

BATCH_SIZE = 100    # Số lượng điểm để upsert mỗi lần