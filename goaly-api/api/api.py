import configparser
import logging
import os
import time
from logging.handlers import RotatingFileHandler

from flask import Flask
from flask import jsonify
from flask import request

from api.api_helpers import generate_id, validate_date

app = Flask(__name__)

app_env = os.environ.get('APP_ENV', 'dev')

# Load configuration from appropriate file based on environment
if app_env == 'dev':
    config_file = 'config/dev.ini'
else:
    config_file = 'config/prod.ini'

# Parse the configuration file
config = configparser.ConfigParser()
config.read(config_file)

if app_env == 'dev':
    log_handler = logging.StreamHandler()
else:
    log_handler = RotatingFileHandler(config.get('logging', 'file'),
                                      maxBytes=config.getint('logging', 'max_bytes'),
                                      backupCount=config.getint('logging', 'backup_count'))

log_handler.setLevel(config.get('logging', 'level'))
log_handler.setFormatter(logging.Formatter(config.get('logging', 'format')))
logging.getLogger().addHandler(log_handler)

tasks_db = {}
completed_tasks_db = {}


# This route is needed for the default EB health check route
@app.route('/')
def home():
    return "ok"


@app.get("/api/completed-tasks")
def get_completed_tasks():
    return jsonify(list(completed_tasks_db.values()))


@app.get("/api/tasks")
def get_tasks():
    return jsonify(list(tasks_db.values()))


@app.post("/api/tasks")
def create_task():
    input_task = request.get_json()
    title = input_task.get("title")
    logging.info(f"Received create task request with title {title}")
    if not title:
        return "Task title cannot be empty", 400
    if len(title) > 200:
        return "Task title is too long", 400

    task_id = generate_id()
    if task_id in tasks_db:
        logging.error(f"Error creating task {task_id}, duplicated id")
        return "Error creating task, try again", 500

    new_task = {"id": task_id, "title": title, "creationDate": time.time()}
    tasks_db[task_id] = new_task
    return new_task


@app.post("/api/completed-tasks")
def complete_task():
    input_completed_task = request.get_json()
    task_id = input_completed_task.get("taskId")
    logging.info(f"Received complete task {task_id}")
    if task_id not in tasks_db:
        return "Task id not found", 404

    date = input_completed_task.get("date")
    if not date and not validate_date(date):
        return "Missing completion date or wrong date format", 400

    completed_task_id = generate_id()
    if completed_task_id in tasks_db:
        logging.error(
            f"Error completing task {task_id}, duplicated id {completed_task_id}"
        )
        return "Error completing task, try again", 500

    new_completed_task = {
        "id": completed_task_id,
        "taskId": task_id,
        "date": date,
    }
    completed_tasks_db[completed_task_id] = new_completed_task
    return new_completed_task


if __name__ == "__main__":
    app.run()
