from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class Vote(BaseModel):
    score: str
    thread_id: str
    user_id: str

def sql_createVote(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"SELECT * FROM votes WHERE thread_id='{data["thread_id"]}' AND user_id='{data["user_id"]}'")
        vals = cursor.fetchall()
        print(vals)
        if len(vals) == 0:
            cursor.execute('''CREATE TABLE IF NOT EXISTS votes (score, thread_id, user_id)''')
            cursor.execute(f"INSERT INTO votes VALUES('{data["score"]}', '{data["thread_id"]}', '{data["user_id"]}')")
        else:
            print("already voted")
    except:
        cursor.execute('''CREATE TABLE IF NOT EXISTS votes (score, thread_id, user_id)''')
        cursor.execute(f"INSERT INTO votes VALUES('{data["score"]}', '{data["thread_id"]}', '{data["user_id"]}')")
    conn.commit()
    conn.close()


@router.post("/createVote")
def createVote(vote: Vote):

    data = {
        "score": vote.score,
        "thread_id": vote.thread_id,
        "user_id": vote.user_id
    }

    sql_createVote(data)

    print("test")

    return data