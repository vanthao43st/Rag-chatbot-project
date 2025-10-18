from fastapi import APIRouter, HTTPException
from app.core import qdrant_client, logger
from src import (
    load_documents, split_documents, embed_texts,
    create_collection, upsert_vectors,
)

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/")
async def upload_documents():
    try:
        documents = load_documents()
        chunks, texts = split_documents(documents)
        embedded_vectors = embed_texts(texts)

        create_collection(qdrant_client)
        upsert_vectors(chunks, embedded_vectors, qdrant_client)

        return {"message": "Documents uploaded and processed successfully."}
    except Exception as e:
        logger.error(f"Error in /upload: {e}")
        raise HTTPException(status_code=500, detail=str(e))
