from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

class Reply(BaseModel):
    contents: str
    thread_id: str
    uuid: str

router = APIRouter()

def sql_createReplies(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS replies (reply_contents, reply_id, thread_id, user_id)''')
    cursor.execute(f"INSERT INTO replies VALUES('{data["contents"]}', '{data["reply_id"]}', '{data["thread_id"]}', '{data["user_id"]}')")
    conn.commit()
    conn.close()

@router.post("/createReply")
def createReplies(reply: Reply):
    reply_id = uuid.uuid4()

    data = {
        "contents": reply.contents,
        "reply_id": str(reply_id),
        "thread_id": reply.thread_id,
        "user_id": reply.uuid
    }

    sql_createReplies(data)

    return data

