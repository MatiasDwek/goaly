import time
from flask import Flask
from flask import jsonify
from flask import request
import random
from datetime import datetime

app = Flask(__name__)

db_tasks = []
db_completed_tasks = []

@app.get('/api/completed-tasks')
def get_completed_tasks():
    return jsonify(db_completed_tasks)

@app.get('/api/tasks')
def get_tasks():
    return jsonify(db_tasks)

@app.post('/api/completed-tasks')
def complete_tasks():
    input_json = request.get_json()
    new_completed_task = {}
    new_completed_task["points"] = input_json.get("points")
    if new_completed_task["points"] is None:
      return "Points not specified", 400 
    if new_completed_task["points"] > 2:
      return "Points larger than maximum", 400
    new_completed_task["id"] = input_json["id"]
    if new_completed_task["id"] is None:
      return "id not specified", 400
    new_completed_task["time"] = time.time()
    #corregir el formato del time
    #solo agregué los que son iguales a create_task. Hay que revisar si no falta nada más.
    db_completed_tasks.append(new_completed_task)
    return new_completed_task

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
    new_task["time"] = time.time()
    #corregir el formato del time
    db_tasks.append(new_task)
    return new_task
    #recuperar la fecha
