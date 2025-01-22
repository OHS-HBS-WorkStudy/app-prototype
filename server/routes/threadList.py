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
    query: str

router = APIRouter()

def sql_threadList(page):
    print(page)
    max_index = 0
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    try:
        cursor.execute(f'SELECT * FROM threads WHERE thread_name LIKE "%{page.query}%"')
        print("other test")
    except:
        print("test")
        cursor.execute("SELECT * FROM threads")
    values = cursor.fetchall()

    count = len(values)

    for x in range(len(values)):
        count -= page.size

        if count >= page.size:
            max_index += 1
            continue
        else:
            max_index += 1
            break


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

    list_data = {
        "list": return_list,
        "totalPages": max_index
    }

    conn.commit()
    conn.close()
    #print(return_list)
    return list_data


@router.post("/threadList")
def threadList(contents: Page):
    data = sql_threadList(contents)

    return data

def sortAge(array):
    sortedArray = []
    
    for x in range(len(array)):
        if x == 0:
            sortedArray.append(array[x])
        else:
            placement_found = False
            for y in range(len(sortedArray)):
                if array[x][1] > sortedArray[y][1]:
                    if y == 0:
                        sortedArray.insert(0, array[x])
                    else:
                        sortedArray.insert(y-1, array[x])
                    placement_found = True
                    break
                else:
                    continue
                
            if placement_found == False:
                sortedArray.append(array[x])
                
    return sortedArray