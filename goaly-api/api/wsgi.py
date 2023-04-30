import logging
import os

from pythonjsonlogger import jsonlogger

from .controllers import app
from .db.schema import create_tables

app_env = os.environ.get("APP_ENV", "dev")

if app_env == "dev":
    logging.basicConfig(format="[%(levelname)s] %(message)s", level=logging.INFO)
    logger = logging.getLogger()
else:
    logger = logging.getLogger()
    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(
        "%(timestamp)s %(levelname)s %(message)s ", timestamp=True
    )
    logHandler.setFormatter(formatter)
    logger.setLevel(logging.INFO)
    logger.addHandler(logHandler)

# Create the database tables
create_tables()

if __name__ == "__main__":
    app.run()
