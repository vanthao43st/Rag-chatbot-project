from app.core.tools.excel_tool import read_excel_sheets, read_excel_data
from .db_tool import query_database
from .web_tool import search_web
import requests
from PIL import Image
from io import BytesIO
from .ocr_tool import extract_text

# excel_tool
# file_path = "data/Text_Emotion_2.csv"
# sheets_result = read_excel_sheets(file_path)
# print("Sheets:", sheets_result)

# excel_data_result = read_excel_data(file_path)
# print("Data:", excel_data_result)


# db_tool
# query_result = query_database("SELECT * FROM products LIMIT 5;")
# print("Query Result:", query_result)



# web_tool
# Tra cứu thông tin mới nhất
# result = search_web("giá vàng hôm nay tại Việt Nam", max_results=5)

# print(result)



# ocr_tool
# image_url = "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2021/01/extract-text-from-document.png?fit=556%2C429&ssl=1"
image_url = "https://caamedia.s3.amazonaws.com/wp-content/uploads/2015/01/fdsp_viet_copy.jpg"

# 📥 Tải ảnh từ URL
response = requests.get(image_url)
image = Image.open(BytesIO(response.content))
# image.show()
image.save("data/sample.png")  # lưu lại để test

# 🔍 Gọi OCR Tool
result = extract_text("data/sample.png", lang="vie+eng")

print("=== OCR Result ===")
print(result["text"])
