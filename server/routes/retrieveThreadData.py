from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class ThreadData(BaseModel):
    name: str
    id: str

def sql_retrieveThread(id):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM threads WHERE thread_id='{id}'")
    value = cursor.fetchone()
    conn.commit()
    conn.close()

    return value

@router.post("/retrieveThread")
def retrieveThread(data: ThreadData):
    value = sql_retrieveThread(data.id)
    return value