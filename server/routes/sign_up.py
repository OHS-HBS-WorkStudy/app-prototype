from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

from datetime import datetime

router = APIRouter()

class User(BaseModel):
    fname: str
    lname: str
    password: str
    email: str
    type: str


def createSQLUser(data):
    conn = sqlite3.connect('app.db')

    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS users (first_name, last_name, password, email, type, uuid, timestamp)''')

    cursor.execute("INSERT INTO users VALUES ('"+data["first_name"]+"','"+data["last_name"]+"','"+data["password"]+"','"+data["email"]+"','"+data["type"]+"','"+str(data["uuid"])+"', '"+data["timestamp"]+"')")

    conn.commit()
    
    conn.close()

    print("user created")

@router.post("/registerNewUser/")
async def test(item: User):
    new_uuid = uuid.uuid4()

    now = datetime.now()

    data = {
        "first_name": item.fname,
        "last_name": item.lname,
        "password": item.password,
        "email": item.email,
        "type": item.type,
        "uuid": new_uuid,
        "timestamp": str(datetime.timestamp(now))
    }

    createSQLUser(data)

    return data