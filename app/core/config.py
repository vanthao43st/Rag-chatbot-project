import logging
from src import init_qdrant

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#==== Init Qdrant Client =====
qdrant_client = init_qdrant()