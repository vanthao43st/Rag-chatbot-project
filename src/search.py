from configs.config import QDRANT_COLLECTION, TOP_K
from .embedder import embedding_model
from .vector_store import qdrant_client

def search_qdrant(query, qdrant_client=qdrant_client, embedding_model=embedding_model, collection_name=QDRANT_COLLECTION, top_k=TOP_K):
    query_vector = embedding_model.encode([query])[0]

    search_result = qdrant_client.search(
        collection_name=collection_name,
        query_vector=query_vector.tolist(),
        limit=top_k
    )

    return search_result