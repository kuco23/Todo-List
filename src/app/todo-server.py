from random import randint
from datetime import datetime as dt
import json
import sqlite3
from bottle import route, get, post, delete, response, request, run

n = 10**10
keyGen = lambda: randint(0,n)

make_table = """
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY,
    userId INTEGER NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL
)
"""
connection = sqlite3.connect('notes.db')
cursor = connection.cursor()
cursor.execute(make_table)
connection.commit()

cursor.execute('DELETE FROM notes WHERE 1')
connection.commit()

def allowCors(fun):
    def decor(*args, **kwargs):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = (
            'PUT, GET, POST, DELETE, OPTIONS'
        )
        response.headers['Access-Control-Allow-Headers'] = (
            'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
        )
        return fun(*args, **kwargs)
    return decor

@get('/note')
@allowCors
def note():
    cursor.execute('SELECT * FROM notes')
    rows = cursor.fetchall()
    cols = ['id', 'userId', 'content', 'timestamp']
    return json.dumps([dict(zip(cols, row)) for row  in rows])

@get('/note/<id:int>')
@allowCors
def noteId(**params):
    cursor.executemany(f'SELECT * FROM notes WHERE id=?', [params['id']])
    rows = cursor.fetchall()
    cols = ['id', 'userId', 'content', 'timestamp']
    return json.dumps([dict(zip(cols, row)) for row in rows])

@post('/note/new')
@allowCors
def noteNew():
    data_id, data, date = keyGen(), request.json, str(dt.now())
    cursor.executemany("""
        INSERT INTO notes (id, userId, content, timestamp) VALUES (?,?,?,?)
        """, [(data_id, data['userId'], data['content'], date)]
    )
    connection.commit()
    return json.dumps({'id': data_id, 'timestamp': date, **data})

@post('/note/update')
@allowCors
def noteUpdate():
    data = request.json
    cursor.executemany("""
        UPDATE notes SET content=?, timestamp=? WHERE id=?
        """, [(data['content'], str(dt.now()), data['id'])]
    )
    connection.commit()

@delete('/note/<id:int>/delete')
@allowCors
def noteDelete(**params):
    cursor.execute(f"DELETE FROM notes WHERE id={params['id']}")
    connection.commit()

@route('/<url:re:.*>', method=['OPTIONS'])
@allowCors
def opts(*args, **kwargs): return {}

run(host='localhost', port=8081, debug=True)
