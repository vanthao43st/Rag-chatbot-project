from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from .config import QDRANT_URL, QDRANT_API_KEY, QDRANT_COLLECTION, EMBEDDING_DIM
import time

def init_qdrant():
    qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
    print("✅ Kết nối Qdrant thành công.")
    return qdrant_client

def create_collection(qdrant_client):
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION,
        vectors_config=VectorParams(
            size=EMBEDDING_DIM,
            distance=Distance.COSINE
        )
    )

    print(f"✅ Collection '{QDRANT_COLLECTION}' đã được tạo.")

def upsert_vectors(chunks, embedded_vectors, qdrant_client, batch_size=100):
    total = len(chunks)

    for start in range(0, total, batch_size):
        end = min(start + batch_size, total)
        batch = [
            PointStruct(
                id=i,
                vector=embedded_vectors[i].tolist(),
                payload={
                    "text": chunks[i].page_content,
                    "source": chunks[i].metadata.get("source", "unknown"),
                    "page": chunks[i].metadata.get("page", 0)
                }
            )
            for i in range(start, end)
        ]

        qdrant_client.upsert(
            collection_name=QDRANT_COLLECTION,
            points=batch
        )

        print(f"⬆️ Upserted {end}/{total} points")

        time.sleep(0.5)  # nghỉ 0.5s giữa các batch để ổn định

    print(f"✅ Đã upsert toàn bộ dữ liệu thành công.")
