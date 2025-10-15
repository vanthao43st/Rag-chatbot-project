import google.generativeai as genai
from .config import GEMINI_API_KEY, GEMINI_MODEL

def ask_gemini(results_search, question):
    genai.configure(api_key=GEMINI_API_KEY)

    context = "\n".join([result.payload.get('text', '') for result in results_search])

    prompt = f"""
    Dựa trên ngữ cảnh sau, trả lời câu hỏi:
    Ngữ cảnh:
    {context}

    Câu hỏi:
    {question}
    """

    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(prompt)
    return response.text