import time
from flask import Flask
from flask import jsonify
from flask import request
import random
from datetime import datetime

app = Flask(__name__)

@app.get('/api/completed-tasks')
def get_completed_tasks():
    return jsonify(db_completed_tasks)

@app.get('/api/tasks')
def get_tasks():
    return jsonify(db_tasks)

#POST

db_tasks = []
db_completed_tasks = []

@app.post('/api/completed-tasks')
def complete_tasks():
    input_json = request.get_json() 
    db_completed_tasks.append(input_json)
    return input_json

@app.post('/api/tasks')
def create_task():
    input_json = request.get_json()
    new_task = {}
    new_task["points"] = input_json.get("points")
    if new_task["points"] is None:
      return "Points not specified", 400
    if new_task["points"] > 2:
      return "Points larger than maximum", 400
    new_task["title"] = input_json["title"]
    new_task["id"] = int(random.random()*100000)
    new_task["date"] = 1
    db_tasks.append(new_task)
    return new_task
    #recuperar la fecha