from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

def sql_threadList():
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM threads")
    values = cursor.fetchall()
    start_list = []
    for x in range(10):
        y = random.randint(0, len(values)-1)
        start_list.append(y)

    return_list = []

    for a in range(len(start_list)):
        return_list.append(values[start_list[a]])

    conn.commit()
    conn.close()
    print(return_list)
    return return_list


@router.get("/threadList")
def threadList():
    data = sql_threadList()

    return data