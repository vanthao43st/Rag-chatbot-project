from sentence_transformers import SentenceTransformer
from .config import EMBEDDING_MODEL

def embed_texts(texts, embeding_model=EMBEDDING_MODEL):
    model = SentenceTransformer(embeding_model)
    embedding_vectors = model.encode(texts)
    print(f"Đã tạo embedding cho {len(embedding_vectors)} đoạn văn bản.")
    return embedding_vectors, model