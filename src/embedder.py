from sentence_transformers import SentenceTransformer
from configs.config import EMBEDDING_MODEL_NAME
import warnings

warnings.filterwarnings("ignore", category=FutureWarning, module="huggingface_hub")

embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

def embed_texts(texts):
    embedding_vectors = embedding_model.encode(texts)
    print(f"Đã tạo embedding cho {len(embedding_vectors)} đoạn văn bản.")
    return embedding_vectors