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
    uuid: str


def confirmSQLUser(data):
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE uuid='"+data["uuid"]+"'")
    value = cursor.fetchone()

    score = clientScore.sql_scoreUser(value[5])

    user_data = {
        "first_name": value[0],
        "last_name": value[1],
        "email": value[3],
        "type": value[4],
        "uuid": value[5],
        "score": score,
        "threads": totals.total_threads(value[5]),
        "replies": totals.total_replies(value[5]),
        "views": totals.total_views(value[5]),
        "timestamp": value[6]
    }
    return user_data



@router.post('/updateUser')
def confirmUser(account: Account_log):
    data = {
        "uuid": adipose(account.uuid),
    }

    user_data = confirmSQLUser(data)

    return user_data