import logging
import os
import time

from flask import Flask
from flask import jsonify
from flask import request
from pythonjsonlogger import jsonlogger

from .api_helpers import generate_id, validate_date
from .db.schema import create_tables

app_env = os.environ.get('APP_ENV', 'dev')

if app_env == 'dev':
    logging.basicConfig(format='%(levelname)s:%(name)s:%(message)s', level=logging.INFO)
    logger = logging.getLogger(__name__)
else:
    logger = logging.getLogger()
    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter('%(timestamp)s %(levelname)s %(message)s ', timestamp=True)
    logHandler.setFormatter(formatter)
    logger.setLevel(logging.INFO)
    logger.addHandler(logHandler)

app = Flask(__name__)

# Move this to another place to avoid creating the tables on every worker
create_tables()

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
    logger.info(f"Received create task request with title {title}")
    if not title:
        return "Task title cannot be empty", 400
    if len(title) > 200:
        return "Task title is too long", 400

    task_id = generate_id()
    if task_id in tasks_db:
        logger.error(f"Error creating task {task_id}, duplicated id")
        return "Error creating task, try again", 500

    new_task = {"id": task_id, "title": title, "creationDate": time.time()}
    tasks_db[task_id] = new_task
    return new_task


@app.post("/api/completed-tasks")
def complete_task():
    input_completed_task = request.get_json()
    task_id = input_completed_task.get("taskId")
    logger.info(f"Received complete task {task_id}")
    if task_id not in tasks_db:
        return "Task id not found", 404

    date = input_completed_task.get("date")
    if not date and not validate_date(date):
        return "Missing completion date or wrong date format", 400

    completed_task_id = generate_id()
    if completed_task_id in tasks_db:
        logger.error(
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
