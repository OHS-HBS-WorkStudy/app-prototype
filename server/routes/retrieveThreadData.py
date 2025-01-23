from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

import routes.countViews as CV

router = APIRouter()

class ThreadData(BaseModel):
    name: str
    id: str

def sql_retrieveThread(id):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM threads WHERE thread_id='{id}'")
    value = cursor.fetchone()
    print(value)

    value2 = [
        value[0],
        value[1],
        value[2],
        value[4]
    ]

    cursor.execute(f"SELECT * FROM users WHERE uuid='{value[3]}'")
    value3 = cursor.fetchone()

    value2.append(f"Anonymouse {value3[4]} 1")

    value2.append(CV.sql_scoreViews(id))
    
    conn.commit()
    conn.close()
    return value2

@router.post("/retrieveThread")
def retrieveThread(data: ThreadData):
    value = sql_retrieveThread(data.id)
    return value