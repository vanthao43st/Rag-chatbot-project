# app/core/tools/excel_tool.py
"""
📘 Công cụ đọc dữ liệu bảng (Excel / CSV)
- Tự động nhận dạng loại file theo đuôi (.xlsx, .xls, .csv)
- Hỗ trợ đọc toàn bộ sheet hoặc cột cụ thể
- Tự xử lý encoding UTF-8, UTF-8-SIG, Windows-1258 (phù hợp dữ liệu tiếng Việt)
"""

import pandas as pd
import os


def read_excel_sheets(file_path: str):
    """
    📄 Đọc thông tin các sheet trong file Excel hoặc xác định loại file CSV.
    Trả về:
        - {"sheets": [...]} nếu là Excel
        - {"type": "csv"} nếu là CSV
        - {"error": "..."} nếu có lỗi
    """
    try:
        ext = os.path.splitext(file_path)[1].lower()

        # 🟢 Nếu là CSV
        if ext == ".csv":
            return {"type": "csv", "note": "File CSV không có sheet, chỉ có 1 bảng dữ liệu."}

        # 🟢 Nếu là Excel
        elif ext in [".xlsx", ".xls"]:
            xls = pd.ExcelFile(file_path, engine="openpyxl")
            return {"sheets": xls.sheet_names}

        else:
            return {"error": f"Định dạng '{ext}' chưa được hỗ trợ. Chỉ chấp nhận .csv, .xlsx, .xls"}

    except Exception as e:
        return {"error": str(e)}



def read_excel_data(file_path: str, sheet_name: str = None, column: str = None):
    """
    📊 Đọc dữ liệu từ file bảng (Excel hoặc CSV).
    Args:
        file_path: đường dẫn tới file (.xlsx, .xls, .csv)
        sheet_name: tên sheet (nếu là Excel)
        column: tên cột muốn lấy riêng (nếu có)
    Trả về:
        - {"data": [...]} nếu đọc thành công
        - {"error": "..."} nếu lỗi
    """
    try:
        ext = os.path.splitext(file_path)[1].lower()

        # 🟢 CSV
        if ext == ".csv":
            # Thử nhiều kiểu encoding để tránh lỗi tiếng Việt
            for enc in ["utf-8-sig", "utf-8", "windows-1258"]:
                try:
                    df = pd.read_csv(file_path, encoding=enc)
                    break
                except Exception:
                    df = None
            if df is None:
                return {"error": "Không đọc được file CSV. Kiểm tra encoding hoặc định dạng."}

        # 🟢 Excel
        elif ext in [".xlsx", ".xls"]:
            df = pd.read_excel(file_path, sheet_name=sheet_name, engine="openpyxl")

        else:
            return {"error": f"Định dạng '{ext}' chưa được hỗ trợ."}

        # 🧩 Nếu người dùng chỉ định cột cụ thể
        if column:
            if column in df.columns:
                values = df[column].dropna().tolist()
                return {
                    "file_type": ext,
                    "column": column,
                    "count": len(values),
                    "data": values[:10],  # hiển thị 10 giá trị đầu tiên
                }
            else:
                return {"error": f"Cột '{column}' không tồn tại. Các cột hiện có: {list(df.columns)}"}

        # 🧾 Nếu không chỉ định cột → trả toàn bộ dữ liệu (dạng danh sách dict)
        return {
            "file_type": ext,
            "rows": len(df),
            "columns": list(df.columns),
            "data": df.head(5).to_dict(orient="records"),  # chỉ preview 5 dòng đầu
        }

    except Exception as e:
        return {"error": str(e)}