import pytesseract
from PIL import Image

def extract_text_from_image(image_path: str, lang: str = "vie+eng"):
    try:
        image = Image.open(image_path)                     # Mở hình ảnh
        text = pytesseract.image_to_string(image=image, lang=lang)  # Trích xuất văn bản
        return {"text": text}
    except Exception as e:
        return {"error": str(e)}