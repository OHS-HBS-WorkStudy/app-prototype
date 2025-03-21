import sqlite3

def total_threads(user_id):
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        cursor.execute(f"SELECT COUNT(*) FROM threads WHERE creator_id='{user_id}'")
        values = cursor.fetchall()
        conn.commit()
        conn.close()
        return len(values)
    except:
        return 0


def total_replies(user_id):
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM replies WHERE user_id='{user_id}'")
        values = cursor.fetchall()
        conn.commit()
        conn.close()
        return len(values)
    except:
        return 0
    
def thread_reply_count(thread_id):
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM replies WHERE thread_id='{thread_id}'")
        values = cursor.fetchall()
        conn.commit()
        conn.close()
        print(len(values))
        return len(values)
    except:
        return 0

def total_views(user_id):
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        cursor.execute(f"SELECT COUNT(*) FROM views WHERE user_id='{user_id}'")
        values = cursor.fetchall()
        conn.commit()
        conn.close()
        return len(values)
    except:
        return 0
