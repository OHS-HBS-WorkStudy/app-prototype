from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routes.scoreVotes import sql_scoreVotes

import sqlite3
import uuid
import random

class Page(BaseModel):
    index: int
    size: int

router = APIRouter()

def sql_threadList(page):
    print(page)
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM threads")
    values = cursor.fetchall()
    start_list = []
    for x in range(page.size):
        y = x+(page.size*(page.index-1))
        start_list.append(y)
        
    #print(values)
    print(f"start list:{start_list}")
    return_list = []

    try:
        for a in range(len(start_list)):
            print(start_list[a], values[start_list[a]])
            score = sql_scoreVotes(values[start_list[a]][2])
            new_data = {
                "name": values[start_list[a]][0],
                "id": values[start_list[a]][2],
                "content": values[start_list[a]][1],
                "timestamp": values[start_list[a]][4],
                "score": score
            }
            return_list.append(new_data)
            print(return_list)
    except:
        print("reached end")


    conn.commit()
    conn.close()
    #print(return_list)
    return return_list


@router.post("/threadList")
def threadList(contents: Page):
    data = sql_threadList(contents)

    return data