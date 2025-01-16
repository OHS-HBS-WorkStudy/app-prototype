from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class ViewInfo(BaseModel):
    thread_id: str

def sql_scoreViews(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    total = 0
    try:
        cursor.execute(f"SELECT * FROM views WHERE thread_id='{data}'")
        values = cursor.fetchall()
        print(values)

        for x in range(len(values)): 
            total += 1
    except:
        print("no values")
        total = 0
    
    conn.commit()
    conn.close()

    return total

@router.post("/scoreViews")
def scoreVotes(id: ViewInfo):
    data = sql_scoreViews(id.thread_id)
    return data