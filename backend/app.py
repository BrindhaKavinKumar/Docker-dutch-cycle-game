from flask import Flask, request, jsonify
import psycopg2
import os
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    retries = 10
    while retries > 0:
        try:
            conn = psycopg2.connect(
                host=os.environ.get("DB_HOST", "db"),
                database=os.environ.get("DB_NAME", "game"),
                user=os.environ.get("DB_USER", "postgres"),
                password=os.environ.get("DB_PASSWORD", "postgres")
            )
            print("Database connection successful")
            return conn
        except psycopg2.OperationalError:
            print("Database not ready, retrying in 3 seconds...")
            retries -= 1
            time.sleep(3)

    raise Exception("Could not connect to the database")

conn = get_db_connection()

@app.route("/health")
def health():
    return {"status": "ok"}

@app.route("/score", methods=["POST"])
def save_score():
    data = request.json
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO scores(player, score) VALUES(%s, %s)",
        (data["player"], data["score"])
    )
    conn.commit()
    return {"message": "saved"}

@app.route("/leaderboard")
def leaderboard():
    cur = conn.cursor()
    cur.execute("SELECT player, score FROM scores ORDER BY score DESC LIMIT 10")
    rows = cur.fetchall()

    result = []
    for r in rows:
        result.append({
            "player": r[0],
            "score": r[1]
        })

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)