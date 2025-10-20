from app.core.tools.excel_tool import read_excel_sheets, read_excel_data

file_path = "app/data/Text_Emotion_2.csv"
sheets_result = read_excel_sheets(file_path)
print("Sheets:", sheets_result)
