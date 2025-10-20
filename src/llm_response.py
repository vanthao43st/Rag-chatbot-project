import google.generativeai as genai
from configs.config import GOOOEL_GEMINI_API_KEY, GEMINI_MODEL
from app.core.utils import log_step

def ask_gemini(results_search, question):
    if GOOOEL_GEMINI_API_KEY:
        genai.configure(api_key=GOOOEL_GEMINI_API_KEY)
    else:
        raise ValueError("GOOOEL_GEMINI_API_KEY is not set in the .env")

    if isinstance(results_search, list) and question:
        context = "\n".join([result.payload.get('text', '') for result in results_search])

        prompt = f"""
        Dựa trên ngữ cảnh sau, trả lời câu hỏi:
        Ngữ cảnh:
        {context}

        Câu hỏi:
        {question}
        """
    else:
        prompt = str(results_search)

    log_step("Gemini", f"Gửi prompt ({len(prompt)} ký tự)...")

    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(prompt)

    if hasattr(response, "text") and response.text:
        text = response.text.strip()
    else:
        text = "Không có phản hồi từ Gemini."

    return text