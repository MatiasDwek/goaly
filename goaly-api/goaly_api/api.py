import time
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

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
    return jsonify([
    {
      "title": "Go to the gym",
      "points": 3,
      "creationDate": "2022-07-23T16:38:42.848Z",
      "id": 1
    },
    {
      "title": "Read a book",
      "points": 2,
      "creationDate": "2022-07-23T16:47:11.578Z",
      "id": 2
    },
    {
      "title": "Hacer API",
      "points": 3,
      "creationDate": "2022-07-24T19:40:31.172Z",
      "id": 3
    },
    {
      "title": "hola",
      "points": 1,
      "creationDate": "2022-07-24T19:40:43.921Z",
      "id": 4
    }
  ])

#POST

@app.route('/api/tasks', methods=['POST'])
def create_tasks():
    input_json = request.get_json(force=True) 
    print(input_json)
    return "a"