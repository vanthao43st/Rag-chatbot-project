import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def query_database(query: str):
    """
    🗄️ Thực hiện truy vấn SQL trên cơ sở dữ liệu PostgreSQL.
    Args:
        query: câu lệnh SQL cần thực thi
    Trả về:
        - {"results": [...]} nếu truy vấn thành công
        - {"error": "..."} nếu có lỗi
    """
    try:
        # Kết nối tới cơ sở dữ liệu PostgreSQL sử dụng biến môi trường
        conn = psycopg2.connect(
            host=os.getenv("PG_HOST", "localhost"),
            port=os.getenv("PG_PORT", "5432"),
            database=os.getenv("PG_DB", "ragdb"),
            user=os.getenv("PG_USER", "postgres"),
            password=os.getenv("PG_PASS", "password")
        )
        cursor = conn.cursor()     # Tạo con trỏ để thực thi lệnh SQL

        # Thực thi truy vấn
        cursor.execute(query)
        rows = cursor.fetchall()    # Lấy tất cả kết quả trả về

        # Lấy tên cột
        colnames = [desc[0] for desc in cursor.description]

        # Đóng kết nối
        cursor.close()
        conn.close()

        # Chuyển kết quả thành danh sách từ điển
        results = [dict(zip(colnames, row)) for row in rows]
        return {"results": results}

    except Exception as e:
        return {"error": str(e)}