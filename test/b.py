from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Dict


app = FastAPI()

class Note(BaseModel):
    title: str
    content: str

notes: Dict[int, Note] = {}
note_id_counter = 1

@app.get("/notes/all", response_class=HTMLResponse)
async def get_all_notes():
    # Generate HTML content for displaying all notes
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>My Note App</title>
        <style>
            .container {{
                border: 1px solid #000;
                padding: 20px;
                width: 80%;
                margin: 0 auto;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>My Note App</h1>
            <table>
                <tr>
                    <th>Title</th>
                </tr>
                {"".join([f"<tr><td><a href='/notes/{note_id}'>{note.title}</a></td></tr>" for note_id, note in notes.items()])}
            </table>
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/notes/{note_id}", response_class=HTMLResponse)
async def get_note(note_id: int):
    note = notes.get(note_id)
    if note:
        return HTMLResponse(content=f"<h1>{note.title}</h1><p>{note.content}</p>")
    return HTMLResponse(content="Note not found")

@app.post("/notes/new", response_class=HTMLResponse)
async def create_note(note: Note):
    global note_id_counter
    notes[note_id_counter] = note
    note_id_counter += 1
    return note


@app.post("/notes/newForm", response_class=HTMLResponse)
async def create_note_form(title: str, content: str):
    global note_id_counter
    note = Note(title=title, content=content)
    notes[note_id_counter] = note
    note_id_counter += 1
    return get_all_notes()
