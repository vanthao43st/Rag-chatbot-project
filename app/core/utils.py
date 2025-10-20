import datetime

def get_current_timestamp():
    return datetime.datetime.now().strftime("[%Y-%m-%d %H:%M:%S]")

def log_step(agent_name: str, message: str):
    timestamp = get_current_timestamp()
    print(f"{timestamp} [{agent_name}] {message}")