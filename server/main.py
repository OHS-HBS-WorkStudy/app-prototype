from fastapi import FastAPI 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from routes import (
    sign_up,
    log_in,
    createThread,
    threadList,
    retrieveThreadData
)

import sqlite3
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(sign_up.router)
app.include_router(log_in.router)
app.include_router(createThread.router)
app.include_router(threadList.router)
app.include_router(retrieveThreadData.router)