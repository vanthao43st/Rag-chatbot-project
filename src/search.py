from .config import QDRANT_COLLECTION

def search_qdrant(query, embedding_model, qdrant_client, collection_name=QDRANT_COLLECTION, top_k=3):
    query_vector = embedding_model.encode([query])[0]

    search_result = qdrant_client.search(
        collection_name=collection_name,
        query_vector=query_vector.tolist(),
        limit=top_k
    )

    return search_result