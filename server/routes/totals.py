import sqlite3

def total_threads(user_id):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM threads WHERE creator_id='{user_id}'")
    values = cursor.fetchall()
    conn.commit()
    conn.close()
    return len(values)


def total_replies(user_id):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM replies WHERE user_id='{user_id}'")
    values = cursor.fetchall()
    conn.commit()
    conn.close()
    return len(values)

def total_views(user_id):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM views WHERE user_id='{user_id}'")
    values = cursor.fetchall()
    conn.commit()
    conn.close()
    return len(values)
