from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

router = APIRouter()

class Tag(BaseModel):
    tag: str
    thread_id: str

def sql_addTags(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS tags (tag_name, thread_id)''')
    cursor.execute(f"INSERT INTO tags VALUES('{data["tag"]}', '{data["thread_id"]}')")
    conn.commit()
    conn.close()

@router.post("/addTags")
def addTags(tags: Tag):

    data = {
    "tag": tags.tag,
    "thread_id": tags.thread_id
    }

    sql_addTags(data)

    return data