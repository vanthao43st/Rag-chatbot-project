import pandas as pd

def read_excel_sheets(file_path: str):
    try:
        xls = pd.ExcelFile(file_path)       # Đọc file Excel
        return {"sheets": xls.sheet_names}  # Trả về tên các sheet
    except Exception as e:
        return {"error": str(e)}            # Trả về lỗi nếu có vấn đề khi đọc file

def read_excel_data(file_path: str, sheet_name: str = None, column: str = None):
    try:
        df = pd.read_excel(file_path, sheet_name=sheet_name)  # Đọc dữ liệu từ sheet cụ thể
        if column and column in df.columns:
            return {"data": df[column].dropna().tolist()}  # Trả về dữ liệu từ cột cụ thể
        else:
            return {"data": df.to_dict(orient='records')}  # Trả về toàn bộ dữ liệu dưới dạng danh sách dict
    except Exception as e:
        return {"error": str(e)}