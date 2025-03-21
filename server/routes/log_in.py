from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

import routes.userScore as clientScore
import routes.totals as totals

from routes.required import adipose

router = APIRouter()

class Account_log(BaseModel):
    email: str
    password: str


def confirmSQLUser(data):
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email='"+data["email"]+"'")
    values = cursor.fetchall()

    user_data = {}

    for x in values:
        if x[2] == data['password']:
            score = 0
            try:
                score = clientScore.sql_scoreUser(x[5])
            except:
                print("no threads to his name")
            user_data = {
                "first_name": x[0],
                "last_name": x[1],
                "email": x[3],
                "type": x[4],
                "uuid": x[5],
                "score": score,
                "threads": totals.total_threads(x[5]),
                "replies": totals.total_replies(x[5]),
                "views": totals.total_views(x[5]),
                "timestamp": x[6]
            }
    return user_data



@router.post('/confirmUser')
def confirmUser(account: Account_log):
    data = {
        "email": adipose(account.email),
        "password": adipose(account.password)
    }

    user_data = confirmSQLUser(data)

    return user_data