"""
📘 Tác dụng:
Bộ điều phối (Orchestrator) quản lý quy trình reasoning của hệ thống RAG:
1️⃣ Reader Agent     → tìm context liên quan.
2️⃣ Summarizer Agent → tóm tắt context.
3️⃣ ToolCaller Agent → phát hiện & gọi tool (Excel, OCR, DB, Web).
4️⃣ Responder Agent  → tổng hợp và trả lời.

LangGraph giúp định nghĩa luồng xử lý và chia sẻ state giữa các agent.
"""

from langgraph.graph import StateGraph, START, END
from typing import TypedDict, List, Optional
from src import init_qdrant, search_qdrant, ask_gemini
from app.core.tools import excel_tool, ocr_tool, db_tool, web_tool
from app.core.utils import log_step
import os

# Định nghĩa kiểu dữ liệu state chia sẻ giữa các agent
class State(TypedDict):
    question: str               # Câu hỏi của người dùng
    contexts: List[str]         # Danh sách context tìm được
    scratchpad: List[str]       # Ghi chú tạm thời (tóm tắt, tool calls, v.v.)
    final: Optional[str]        # Câu trả lời cuối cùng

# === Reader Agent ===
def reader_node(state: State):
    # Tìm context liên quan từ Qdrant
    log_step("Reader", "Tìm context trong vector DB...")
    results = search_qdrant(state["question"])
    state["contexts"] = [r["text"] for r in results]
    return state

# === Summarizer Agent ===
def summarizer_node(state: State):
    # Tóm tắt các đoạn context để rút gọn đầu vào
    log_step("Summarizer", "Tóm tắt nội dung context...")

    joined_context = "\n".join(state["contexts"][:3])       # Lấy 3 đoạn context đầu tiên để tóm tắt
    prompt = f"Tóm tắt ngắn gọn nội dung sau:\n{joined_context}"

    summary = ask_gemini(prompt)
    state["scratchpad"] = [f"[Tóm tắt]: {summary}"]