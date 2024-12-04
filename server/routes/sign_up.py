from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

import sqlite3
import uuid

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


router = APIRouter()

class User(BaseModel):
    fname: str
    lname: str
    password: str
    email: str
    type: str

def get_password_hash(password):
    return pwd_context.hash(password)



def createSQLUser(data):
    conn = sqlite3.connect('app.db')

    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS users (first_name, last_name, password, email, type, uuid )''')
    #hash_password = get_password_hash(data["password"])
    #print(hash_password)
    cursor.execute("INSERT INTO users VALUES ('"+data["first_name"]+"','"+data["last_name"]+"','"+data["password"]+"','"+data["email"]+"','"+data["type"]+"','"+str(data["uuid"])+"')")

    conn.commit()
    
    conn.close()

    print("user created")

@router.post("/registerNewUser/")
async def test(item: User):
    new_uuid = uuid.uuid4()

    data = {
        "first_name": item.fname,
        "last_name": item.lname,
        "password": item.password,
        "email": item.email,
        "type": item.type,
        "uuid": new_uuid
    }

    createSQLUser(data)

    return data