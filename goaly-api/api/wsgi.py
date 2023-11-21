import logging
import os

from pythonjsonlogger import jsonlogger

from .controllers import app
from .db.schema import create_tables

DEV_DB_URL = "postgresql://root:@cockroachlabs:26257/tasks"

app_env = os.environ.get("APP_ENV", "dev")

if app_env == "dev":
    logging.basicConfig(format="[%(levelname)s] %(message)s", level=logging.INFO)
    logger = logging.getLogger()

    db_url = DEV_DB_URL
else:
    logger = logging.getLogger()
    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(
        "%(timestamp)s %(levelname)s %(message)s ", timestamp=True
    )
    logHandler.setFormatter(formatter)
    logger.setLevel(logging.INFO)
    logger.addHandler(logHandler)

    db_url = os.environ["DATABASE_URL"]

# Create the database tables
try:
    create_tables(db_url)
except Exception as e:
    logger.error(e)

if __name__ == "__main__":
    app.run()
