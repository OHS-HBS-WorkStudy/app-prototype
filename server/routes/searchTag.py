from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

from routes.scoreVotes import sql_scoreVotes

router = APIRouter()

class Tag(BaseModel):
    tag: str

def sql_searchTag(data):
    conn = sqlite3.connect('app.db')
    print("hello")
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

        score = sql_scoreVotes(values4[2])
        tag_list = getTagList(values4[2])

        values5 = {
            "name": values4[0],
            "id": values4[2],
            "content": values4[1],
            "timestamp": values4[4],
            "score": score,
            "tags": tag_list
        }

        values3.append(values5)

        values6 = {
            "list": values3,
            "totalPages": 1
        }

    conn.commit()
    conn.close()

    return values6

@router.post("/searchTag")
def searchTag(tag: Tag):
    data = sql_searchTag(tag.tag)
    return data

def getTagList(id):
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()

        cursor.execute(f"SELECT * FROM tags WHERE thread_id='{id}'")

        values = cursor.fetchall()

        print(values)

        values2 = []

        if len(values) > 0:
            for x in range(len(values)):
                values2.append(values[x][0])
        else:
            values2.append("#No tags")

        print(values2) 

        return values2
    except:
        return "#No tags"