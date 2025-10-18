from fastapi import APIRouter, HTTPException
from app.models import QueryRequest
from app.core import logger, qdrant_client
from src import ask_gemini, search_qdrant

router = APIRouter(prefix="/query", tags=["query"])

@router.post("/")
async def query_documents(request: QueryRequest):
    try:
        query = request.question
        if not query:
            raise HTTPException(status_code=400, detail="Query is required.")

        search_results = search_qdrant(query, qdrant_client)
        response = ask_gemini(search_results, query)

        return {"response": response}
    except Exception as e:
        logger.error(f"Error in /query: {e}")
        raise HTTPException(status_code=500, detail=str(e))