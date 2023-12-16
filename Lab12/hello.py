from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Student(BaseModel):
    id: int
    name: str

students = {}
student_id_counter = 1

@app.get("/students/all")
async def get_all_students():
    return students

@app.get("/students/{student_id}")
async def get_student(student_id: int):
    return students.get(student_id, "Student not found")

@app.post("/students/new/")
async def create_student(student: Student):
    global student_id_counter
    students[student_id_counter] = student
    student_id_counter += 1
    return student

@app.post("/students/newForm")
async def create_student_form(id: int, name: str):
    global student_id_counter
    student = Student(id=id, name=name)
    students[student_id_counter] = student
    student_id_counter += 1
    return student