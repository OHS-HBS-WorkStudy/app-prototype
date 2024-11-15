from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

class Thread(BaseModel):
    thread_id: str

router = APIRouter()

def sql_replyList(data):    
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM replies where thread_id='{data}'")
    values = cursor.fetchall()
    
    new_list = []
    
    for x in range(len(values)):
        data = {
            "contents": values[x][0],
            "reply_id": values[x][1],
            "thread_id": values[x][2]
        }
        new_list.append(data)

    conn.commit()
    conn.close()
    print(new_list)
    return new_list

@router.post("/replyList")
def replyList(id:Thread):
    data = sql_replyList(id.thread_id)

    return data