from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from configs.config import QDRANT_URL, QDRANT_API_KEY, QDRANT_COLLECTION
import time

qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

def create_collection():
    qdrant_client.recreate_collection(
        collection_name="pdf_chunks",
        vectors_config=VectorParams(
            size=768,                   # kích thước vector (phải đúng với embedding model)
            distance=Distance.COSINE    # kiểu đo khoảng cách (Cosine, Euclidean, Dot)
        )
    )

def upsert_vectors(chunks, embedded_vectors, batch_size=100):
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
