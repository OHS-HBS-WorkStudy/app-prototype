from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class VoteInfo(BaseModel):
    thread_id: str

def sql_scoreVotes(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    total = 0
    try:
        cursor.execute(f"SELECT * FROM votes WHERE thread_id='{data}'")
        values = cursor.fetchall()
        print(values)

        for x in range(len(values)): 
            if values[x][0] == "positive":
                total += 1
            else: 
                total -= 1
    except:
        print("no values")
        total = 0
    
    conn.commit()
    conn.close()

    return total

@router.post("/scoreVotes")
def scoreVotes(id: VoteInfo):
    data = sql_scoreVotes(id.thread_id)
    return data