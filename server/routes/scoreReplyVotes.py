from fastapi import APIRouter 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

router = APIRouter()

class ReplyVoteInfo(BaseModel):
    thread_id: str

def sql_scoreVotes(data):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    cursor.execute("create table if not exists reply_votes (score, thread_id, reply_id, user_id)")
    cursor.execute(f"SELECT * FROM reply_votes WHERE thread_id='{data}'")
    values = cursor.fetchall()
    print(values)

    unique_replies = []
    totals = {}

    for x in range(len(values)):
        if x == 0:
            unique_replies.append(values[x][2])
        else:
            for y in range(len(unique_replies)):
                if values[x][2] == unique_replies[y]:
                    break
                else:
                    unique_replies.append(values[x][2])

    print(unique_replies)

    for x in range(len(unique_replies)):
        total = 0
        for y in range(len(values)):
            if values[y][2] == unique_replies[x]:
                if values[y][0] == "positive":
                    total += 1
                else:
                    total -= 1
        #totals.append(total)
        totals[unique_replies[x]] = total

    # try:

    #     for x in range(len(values)): 
    #         if values[x][0] == "positive":
    #             total += 1
    #         else: 
    #             total -= 1
    # except:
    #     print("no values")
    #     total = 0
    
    conn.commit()
    conn.close()

    print(totals)

    return totals

@router.post("/scoreReplyVotes")
def scoreReplyVotes(replyData: ReplyVoteInfo):
    data = sql_scoreVotes(replyData.thread_id)
    return data