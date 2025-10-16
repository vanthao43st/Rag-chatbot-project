from flask import Flask, request, jsonify
from flask_cors import CORS
from src import (
    load_documents, split_documents, embed_texts,
    init_qdrant, create_collection, upsert_vectors,
    search_qdrant, ask_gemini
)
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

qdrant_client = init_qdrant()

@app.route('/upload', methods=['POST'])
def upload_documents():
    try:
        documents = load_documents()
        chunks, texts = split_documents(documents)
        embedded_vectors = embed_texts(texts)

        create_collection(qdrant_client)
        upsert_vectors(chunks, embedded_vectors, qdrant_client)

        return jsonify({"message": "Documents uploaded and processed successfully."}), 200
    except Exception as e:
        logger.error(f"Error in /upload: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/query', methods=['POST'])
def query_documents():
    try:
        data = request.json
        query = data.get('question', '')

        if not query:
            return jsonify({"error": "Query is required."}), 400

        search_results = search_qdrant(query, qdrant_client)
        response = ask_gemini(search_results, query)

        return jsonify({"response": response}), 200
    except Exception as e:
        logger.error(f"Error in /query: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)