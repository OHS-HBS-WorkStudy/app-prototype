from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

router = APIRouter()

class ThreadInfo(BaseModel):
    thread_name: str
    thread_contents: str
    uuid: str

def sql_createThread(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS threads (thread_name, thread_contents, thread_id, creator_id)''')
    cursor.execute(f"INSERT INTO threads VALUES('{data["thread_name"]}', '{data["thread_contents"]}', '{data["thread_id"]}', '{data["creator_id"]}')")
    conn.commit()
    conn.close()

    print("thread created")

@router.post("/createThread")
def createThread(info: ThreadInfo):
    thread_id = uuid.uuid4()

    data = {
        "thread_name": info.thread_name,
        "thread_contents": info.thread_contents,
        "thread_id": str(thread_id),
        "creator_id": info.uuid
    }

    sql_createThread(data)

    return data