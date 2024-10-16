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

def sql_createVote(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS votes (score, thread_id)''')
    cursor.execute(f"INSERT INTO votes VALUES('{data["score"]}', '{data["thread_id"]}')")
    conn.commit()
    conn.close()


@router.post("/createVote")
def createVote(vote: Vote):

    data = {
        "score": vote.score,
        "thread_id": vote.thread_id
    }

    sql_createVote(data)

    return data