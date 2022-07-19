import time
from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/completed-tasks')
def get_completed_tasks():
    return jsonify([
    {
      "id": 1,
      "date": 1658076446963,
      "points": 1
    },
    {
      "id": 2,
      "date": 1649004471000,
      "points": 5
    },
    {
      "id": 3,
      "date": 1642697271000,
      "points": 1
    },
    {
      "date": 1657843200000,
      "points": 1,
      "id": 4
    },
    {
      "date": 1657929600000,
      "points": 1,
      "id": 5
    },
    {
      "date": 1657238400000,
      "points": 1,
      "id": 6
    },
    {
      "date": 1657756800000,
      "points": 1,
      "id": 7
    },
    {
      "date": 1641340800000,
      "points": 1,
      "id": 8
    }
    ])