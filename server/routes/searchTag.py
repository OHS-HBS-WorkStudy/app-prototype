from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

router = APIRouter()

class Tag(BaseModel):
    tag: str

def sql_searchTag(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM tags WHERE tag_name='{data}'")
    values = cursor.fetchall()
    print(values)
    values2 = []

    for x in range(len(values)):
        values2.append(values[x][1])
        print(values2)

    values3 = []

    for x in values2:
        cursor.execute(f"SELECT * FROM threads WHERE thread_id='{x}'")
        values4 = cursor.fetchone()

        print(values4)

        values5 = {
            "name": values4[0],
            "id": values4[2]
        }

        values3.append(values5)

    conn.commit()
    conn.close()

    return values3

@router.post("/searchTag")
def searchTag(tag: Tag):
    data = sql_searchTag(tag.tag)
    return data