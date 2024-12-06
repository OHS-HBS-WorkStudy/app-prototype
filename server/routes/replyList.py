from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid

class Thread(BaseModel):
    thread_id: str

router = APIRouter()

def sql_replyList(data):    
    anon_list = []
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM replies WHERE thread_id='{data}'")
    values = cursor.fetchall()

    cursor.execute(f"SELECT creator_id FROM threads WHERE thread_id='{data}'")
    creator = cursor.fetchone()

    anon_list.append(creator[0])

    for x in range(len(values)):
        for y in range(len(anon_list)):
            if values[x][3] == anon_list[y]:
                break
        else:
            anon_list.append(values[x][3])
            print(values[x][3])
    print("help:")
    print(anon_list)

    anon_dict = {}

    for x in range(len(anon_list)):
        anon_dict[anon_list] = f"Anonymous User {x+1}"
    
    new_list = []
    
    for x in range(len(values)):
        data = {
            "contents": values[x][0],
            "reply_id": values[x][1],
            "thread_id": values[x][2],
            "user": anon_dict[values[x][3]]
        }
        new_list.append(data)

    conn.commit()
    conn.close()
    print(new_list)
    return new_list

@router.post("/replyList")
def replyList(id:Thread):
    data = sql_replyList(id.thread_id)

    return data