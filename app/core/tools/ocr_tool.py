import pytesseract
from PIL import Image
from io import BytesIO
import requests

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text(image_path_or_url: str, lang: str = "vie+eng"):
    try:
        if image_path_or_url.startswith("http"):
            # Nếu là URL
            response = requests.get(image_path_or_url, timeout=10)
            img = Image.open(BytesIO(response.content))
        else:
            # Nếu là file cục bộ
            img = Image.open(image_path_or_url)

        text = pytesseract.image_to_string(img, lang=lang)
        return {"text": text[:5000]}
    except Exception as e:
        return {"error": str(e)}
