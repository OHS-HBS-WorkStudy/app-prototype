from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routes.scoreVotes import sql_scoreVotes

import sqlite3
import uuid
import random

router = APIRouter()

class User(BaseModel):
    user: str

def sql_threadList(user):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM threads WHERE creator_id='{user}'")
    values = cursor.fetchall()
    start_list = []
    for x in range(len(values)):
        start_list.append(x)

    return_list = []

    for a in range(len(start_list)):
        score = sql_scoreVotes(values[start_list[a]][2])
        new_data = {
            "name": values[start_list[a]][0],
            "id": values[start_list[a]][2],
            "content": values[start_list[a]][1],
            "score": score
        }
        return_list.append(new_data)

    conn.commit()
    conn.close()
    print(return_list)
    return return_list


@router.post("/userThreads")
def threadList(data: User):
    data = sql_threadList(data.user)

    return data