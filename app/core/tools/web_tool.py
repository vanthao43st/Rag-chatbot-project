from duckduckgo_search import DDGS

def search_web(query: str, max_results: int = 3):
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
        snippets = [r['body'] for r in results]
        return {"results": snippets}
    except Exception as e:
        return {"error": str(e)}
