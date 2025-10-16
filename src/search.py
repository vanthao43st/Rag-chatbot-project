from configs.config import QDRANT_COLLECTION
from .embedder import embedding_model

def search_qdrant(query, qdrant_client, embedding_model=embedding_model, collection_name=QDRANT_COLLECTION, top_k=3):
    query_vector = embedding_model.encode([query])[0]

    search_result = qdrant_client.search(
        collection_name=collection_name,
        query_vector=query_vector.tolist(),
        limit=top_k
    )

    return search_result