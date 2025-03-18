from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

from datetime import datetime

from routes.required import adipose

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
        "first_name": adipose(item.fname),
        "last_name": adipose(item.lname),
        "password": adipose(item.password),
        "email": adipose(item.email),
        "type": str(item.type),
        "uuid": str(new_uuid),
        "timestamp": str(datetime.timestamp(now))
    }

    createSQLUser(data)

    return data