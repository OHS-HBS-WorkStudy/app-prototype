from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

from routes.required import adipose

router = APIRouter()

class Tag(BaseModel):
    tag: list
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
    for x in range(len(tags.tag)):
        data = {
        "tag": adipose(tags.tag[x]),
        "thread_id": adipose(tags.thread_id)
        }

        sql_addTags(data)

    return data