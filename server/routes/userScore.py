from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

import routes.scoreVotes as SV

router = APIRouter()

class User(BaseModel):
    uuid: str

def sql_scoreUser(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM threads WHERE creator_id='{data}'")
    values = cursor.fetchall()

    print(values)

    values2 = []

    for x in range(len(values)):
        values2.append(values[x][2])
    print(values2)

    values3 = []

    for x in range(len(values2)):
        newData = SV.sql_scoreVotes(values2[x])
        values3.append(newData)

    print(values3)

    value4 = 0

    for x in range(len(values3)):
        value4 += values3[x]
        
    print(value4)

    return value4/len(values3)

@router.post('/scoreUser')
def scoreUser(user: User):
    data = user.uuid

    score = sql_scoreUser(data)

    return score