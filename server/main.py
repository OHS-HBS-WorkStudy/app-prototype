from fastapi import FastAPI 
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from routes import (
    sign_up,
    log_in,
    createThread,
    threadList,
    retrieveThreadData,
    createReplies,
    replyList,
    createVote,
    scoreVotes,
    addTags,
    searchTag,
    userScore,
    userThreads,
    viewedUser,
    countViews,
    createReplyVote,
    scoreReplyVotes,
    topThreads,
    topReplies,
    user_data
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
app.include_router(createReplies.router)
app.include_router(replyList.router)
app.include_router(createVote.router)
app.include_router(scoreVotes.router)
app.include_router(addTags.router)
app.include_router(searchTag.router)
app.include_router(userScore.router)
app.include_router(userThreads.router)
app.include_router(viewedUser.router)
app.include_router(countViews.router)
app.include_router(createReplyVote.router)
app.include_router(scoreReplyVotes.router)
app.include_router(topThreads.router)
app.include_router(topReplies.router)
app.include_router(user_data.router)