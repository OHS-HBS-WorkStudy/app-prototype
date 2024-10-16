from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

router = APIRouter()

def sql_replyList():    
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM replies")
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

@router.get("/replyList")
def replyList():
    data = sql_replyList()

    return data