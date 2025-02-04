from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

import routes.scoreReplyVotes as SV

class Owner(BaseModel):
    user_id: str

router = APIRouter()

def sql_topReplies(owner):
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM replies WHERE user_id='{owner}'")
        values = cursor.fetchall()

        print(values)

        values_score = {}

        for x in range(len(values)):
            score = SV.sql_scoreVotes(values[x][2])
            values_score[values[x][2]] = addlist(score)

        print(values_score)
        
        values = sorted(values, key=lambda x: values_score[x[2]], reverse=True)
        print(values)

        try:
            values2 = [
                values[0],
                values[1],
                values[2]
            ]
        except:
            try:
                values2 = [
                    values[0],
                    values[1]
                ]
            except:
                try:
                    values2 = [
                        values[0]
                    ]
                except:
                    values2 = []

        conn.commit()
        conn.close()

        return values2
    except:
        return []

@router.post("/topReplies")
def getTopReplies(owner:Owner):
    values = sql_topReplies(owner.user_id)
    return values


def addlist(list):
    total = 0
    try:
        for x in range(len(list)):
            total += list[x]
    except:
        print("no values")
        total = 0
    return total