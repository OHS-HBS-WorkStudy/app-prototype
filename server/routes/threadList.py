from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routes.scoreVotes import sql_scoreVotes

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
        score = sql_scoreVotes(values[start_list[a]][2])
        new_data = {
            "name": values[start_list[a]][0],
            "id": values[start_list[a]][2],
            "content": values[start_list[a]][1],
            "timestamp": values[start_list[a]][4],
            "score": score
        }
        return_list.append(new_data)

    conn.commit()
    conn.close()
    print(return_list)
    return return_list


@router.get("/threadList")
def threadList():
    data = sql_threadList()

    return data