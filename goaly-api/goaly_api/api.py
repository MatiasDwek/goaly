import time
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

#TEST FOR A DATABASE AS PYTHON LIST

db_test = [{
      "date": "2022/6/24",
      "taskId": 1,
      "id": 1
    },
    {
      "date": "2022/6/24",
      "taskId": 2,
      "id": 2
    },
    {
      "date": "2022/6/24",
      "taskId": 3,
      "id": 3
    },
    {
      "date": "2022/6/24",
      "taskId": 4,
      "id": 4
    },
    {
      "date": "2022/6/23",
      "taskId": 2,
      "id": 5
    }]

@app.route('/api/completed-tasks-demo')
def get_completed_tasks_demo():
    return jsonify(db_test)

##############################################

@app.route('/api/completed-tasks')
def get_completed_tasks():
    return jsonify([
    {
      "date": "2022/6/24",
      "taskId": 1,
      "id": 1
    },
    {
      "date": "2022/6/24",
      "taskId": 2,
      "id": 2
    },
    {
      "date": "2022/6/24",
      "taskId": 3,
      "id": 3
    },
    {
      "date": "2022/6/24",
      "taskId": 4,
      "id": 4
    },
    {
      "date": "2022/6/23",
      "taskId": 2,
      "id": 5
    }
  ])

@app.route('/api/tasks')
def get_tasks():
    return jsonify(db)

#POST

db = []

@app.route('/api/tasks', methods=['POST'])
def create_tasks():
    input_json = request.get_json(force=True) 
    db.append(input_json)
    print(db)
    return input_json
