from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class View(BaseModel):
    thread_id: str
    user_id: str

def sql_createView(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"SELECT * FROM views WHERE thread_id='{data["thread_id"]}' AND user_id='{data["user_id"]}'")
        vals = cursor.fetchall()
        print(vals)
        if len(vals) == 0:
            cursor.execute('''CREATE TABLE IF NOT EXISTS views (thread_id, user_id)''')
            cursor.execute(f"INSERT INTO views VALUES('{data["thread_id"]}', '{data["user_id"]}')")
        else:
            print("already viewed")
    except:
        cursor.execute('''CREATE TABLE IF NOT EXISTS views (thread_id, user_id)''')
        print("already viewed, or something broke")
    conn.commit()
    conn.close()


@router.post("/createView")
def createView(view: View):

    data = {
        "thread_id": view.thread_id,
        "user_id": view.user_id
    }

    sql_createView(data)

    data2 = {
       "thread": data["thread_id"],
       "user": data["user_id"],
       "viewed": True
    }

    return data2