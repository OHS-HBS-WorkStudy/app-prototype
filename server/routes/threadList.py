from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routes.scoreVotes import sql_scoreVotes
from routes.countViews import sql_scoreViews
from routes.totals import thread_reply_count

import sqlite3
import uuid
import random

class Page(BaseModel):
    index: int
    size: int
    query: str
    ageType: str
    contentType: str

router = APIRouter()

def sql_threadList(page):
    print(page)
    max_index = 0
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS threads (thread_name, thread_contents, thread_id, creator_id, timestamp)''')
    
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

    try:
        values = sortAgeType(values, page.ageType)
    except:
        print("no age type")

    if page.contentType == "likes":
        values = sortLikes(values)
        print("likes")
    elif page.contentType == "views":    
        values = sortViews(values)
        print("views")
    elif page.contentType == "replies":
        values = sortReplies(values)
        print("replies")
    else:
        print("no content type")


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
            tag_list = getTagList(values[start_list[a]][2])
            new_data = {
                "name": values[start_list[a]][0],
                "id": values[start_list[a]][2],
                "content": values[start_list[a]][1],
                "timestamp": values[start_list[a]][4],
                "score": score,
                "tags": tag_list
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
      
def sortAgeType(array, type):
    if type == "newest":
        return sortAge(array)
    elif type == "oldest":
        return array


def sortAge(array):
    sortedArray = []
    
    for x in range(len(array)):
        if x == 0:
            sortedArray.append(array[x])
        else:
            placement_found = False
            for y in range(len(sortedArray)):
                if array[x][4] > sortedArray[y][4]:
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


def sortLikes(array):
    sorted_score = {}
    sortedArray = []
    
    for x in range(len(array)):
        data = sql_scoreVotes(array[x][2])

        sorted_score[array[x][2]] = data

    for x in range(len(array)):
        if x == 0:
            sortedArray.append(array[x])
        else:
            placement_found = False
            for y in range(len(sortedArray)):
                if sorted_score[array[x][2]] > sorted_score[sortedArray[y][2]]:
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

def sortViews(array):
    sorted_score = {}
    sortedArray = []
    
    for x in range(len(array)):
        data = sql_scoreViews(array[x][2])

        sorted_score[array[x][2]] = data

    for x in range(len(array)):
        if x == 0:
            sortedArray.append(array[x])
        else:
            placement_found = False
            for y in range(len(sortedArray)):
                if sorted_score[array[x][2]] > sorted_score[sortedArray[y][2]]:
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

def sortReplies(array):
    sorted_score = {}
    sortedArray = []
    
    for x in range(len(array)):
        data = thread_reply_count(array[x][2])

        sorted_score[array[x][2]] = data
        print(sorted_score)

    for x in range(len(array)):
        if x == 0:
            sortedArray.append(array[x])
        else:
            placement_found = False
            for y in range(len(sortedArray)):
                if sorted_score[array[x][2]] > sorted_score[sortedArray[y][2]]:
                    if y == 0:
                        sortedArray.insert(0, array[x])
                    else:
                        sortedArray.insert(y-1, array[x])
                    placement_found = True
                    break
                else:
                    continue
            print(sortedArray)
                
            if placement_found == False:
                sortedArray.append(array[x])
                
    print(sorted_score)
    print("here you go, asshole:", sortedArray)
    return sortedArray