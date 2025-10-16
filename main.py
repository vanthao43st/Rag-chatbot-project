from src import (
    load_documents, split_documents, embed_texts,
    init_qdrant, create_collection, upsert_vectors, search_qdrant,
    ask_gemini
)
import os, ssl, certifi
import httpx

os.environ["SSL_CERT_FILE"] = certifi.where()

# Patch cho httpx (thư viện Qdrant dùng bên trong)
httpx_client = httpx.Client(verify=certifi.where())

def main():
    # Load and split documents
    documents = load_documents()
    chunks, texts = split_documents(documents)

    # Embed texts
    embedded_vectors = embed_texts(texts)

    # Initialize Qdrant and create collection
    qdrant_client = init_qdrant()
    create_collection(qdrant_client)

    # Upsert vectors into Qdrant
    upsert_vectors(chunks, embedded_vectors, qdrant_client)

    # Example search query
    query = "Đối tượng dự tuyển sinh yêu cầu như thế nào?"
    search_results = search_qdrant(query, qdrant_client)

    # Generate response using Gemini
    response = ask_gemini(search_results, query)
    print("Response from Gemini:", response)

if __name__ == "__main__":
    main()
