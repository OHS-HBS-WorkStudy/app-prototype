from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class ReplyVote(BaseModel):
    score: str
    thread_id: str
    reply_id: str
    user_id: str

def sql_createVote(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"SELECT * FROM reply_votes WHERE thread_id='{data["thread_id"]}' AND user_id='{data["user_id"]}'")
        vals = cursor.fetchall()
        print(vals)
        if len(vals) == 0:
            cursor.execute('''CREATE TABLE IF NOT EXISTS reply_votes (score, thread_id, reply_id, user_id)''')
            cursor.execute(f"INSERT INTO reply_votes VALUES('{data["score"]}', '{data["thread_id"]}', '{data["reply_id"]}', '{data["user_id"]}')")
        else:
            print("already voted")
    except:
        cursor.execute('''CREATE TABLE IF NOT EXISTS reply_votes (score, thread_id, user_id)''')
        cursor.execute(f"INSERT INTO reply_votes VALUES('{data["score"]}', '{data["thread_id"]}', '{data["reply_id"]}', '{data["user_id"]}')")
    conn.commit()
    conn.close()


@router.post("/createReplyVote")
def createReplyVote(reply_vote: ReplyVote):

    data = {
        "score": reply_vote.score,
        "thread_id": reply_vote.thread_id,
        "reply_id": reply_vote.reply_id,
        "user_id": reply_vote.user_id
    }

    sql_createVote(data)

    print("test")

    return data