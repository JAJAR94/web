import ZODB, ZODB.FileStorage
import persistent
import transaction
import BTrees._OOBTree

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

class Course(persistent.Persistent):
    def __init__(self, id, name="", credit=0, gradescheme=None):
        self.credit = credit
        self.id = id
        self.name = name
        self.gradeScheme = gradescheme

    def __str__(self):
        return "ID: %8s Course Name: %s, Credit %d" % (str(self.id), self.name, self.credit)
    
    def getCredit(self):
        return self.credit
    
    def scoreGrading(self, score):
        for grade in self.gradeScheme:
            if grade["min"] <= score <= grade["max"]:
                return grade["Grade"]
        return None
    
    def setGradeScheme(self, grade_scheme):
        if isinstance(grade_scheme, list):
            for scheme in grade_scheme:
                if isinstance(scheme, dict) and all(key in scheme for key in ("Grade", "min", "max")):
                    self.gradeScheme = grade_scheme
                    return True
        return False
    
    def setName(self, name):
        self.name = name

    def printDetail(self):
        print(self.__str__())

class Student(persistent.Persistent):
    def __init__(self, id, name=""):
        self.enrolls = []
        self.id = id
        self.name = name
        
    def enrollCourse(self, course, score):
        enroll = Enrollment(course, score)
        self.enrolls.append(enroll)

    def getEnrollment(self, course):
        for enroll in self.enrolls:
            if enroll.getCourse() == course:
                return enroll
        return None
    
    def printTranscript(self):
        print("\t Transcript\n")
        print(f"ID:\t{self.id} Name: {self.name}\n")
        print("Course list\n")
        score = 0
        credit = 0
        for enroll in self.enrolls:
            course = enroll.getCourse()
            grade = enroll.getGrade()
            enroll.printDetail()
            print()
            credit += course.credit
            if grade == "A":
                score += 4 * course.credit
            elif grade == "B+":
                score += 3.5 * course.credit
            elif grade == "B":
                score += 3 * course.credit
            elif grade == "C+":
                score += 2.5 * course.credit
            elif grade == "C":
                score += 2 * course.credit
            elif grade == "D+":
                score += 1.5 * course.credit
            elif grade == "D":
                score += 1 * course.credit
            elif grade == "F":
                score += 0 * course.credit
        if credit != 0:
            gpa = score / credit
            print(f"GPA: {gpa}")

    def setName(self, name):
        self.name = name

class Enrollment(persistent.Persistent):
    def __init__(self, course, score):
        self.course = course
        self.score = score

    def getCourse(self):
        return self.course

    def getGrade(self):
        return self.course.scoreGrading(self.score)

    def setScore(self, score):
        self.score = score

    def printDetail(self):
        print(f"ID\t{self.course.id}  Course: {self.course.name}, Credit: {self.course.credit}  Grade: {self.getGrade()}")

gradeScheme1 = [
    {"Grade": "A", "min": 80, "max": 100},
    {"Grade": "B", "min": 70, "max": 79},
    {"Grade": "C", "min": 60, "max": 69},
    {"Grade": "D", "min": 50, "max": 59},
    {"Grade": "F", "min": 0, "max": 49},
]
gradeScheme2 = [
    {"Grade": "A", "min": 90, "max": 100},
    {"Grade": "B", "min": 70, "max": 89},
    {"Grade": "C", "min": 60, "max": 69},
    {"Grade": "D", "min": 50, "max": 59},
    {"Grade": "F", "min": 0, "max": 49},
]
gradeScheme3 = [
    {"Grade": "A", "min": 80, "max": 100},
    {"Grade": "B", "min": 70, "max": 79},
    {"Grade": "C", "min": 55, "max": 69},
    {"Grade": "D", "min": 50, "max": 54},
    {"Grade": "F", "min": 0, "max": 49},
]

root.courses = BTrees._OOBTree.BTree()
root.courses[101] = Course(101, "Computer Programming", 4, gradeScheme1)
root.courses[201] = Course(201, "Web Programming", 4, gradeScheme1)
root.courses[202] = Course(202, "Software Engineering Principle", 5, gradeScheme2)
root.courses[301] = Course(301, "Artificial Intelligent", 3, gradeScheme3)

comProg = root.courses[101]
webProg = root.courses[201]
software = root.courses[202]
ai = root.courses[301]

root.students = BTrees._OOBTree.BTree()
root.students[65011353] = Student(65011353, "Kritanat Chorpaga")

dvalinn = root.students[65011353]
dvalinn.enrollCourse(comProg, 75)
dvalinn.enrollCourse(webProg, 81)
dvalinn.enrollCourse(software, 81)
dvalinn.enrollCourse(ai, 57)

transaction.commit()

if __name__ == "__main__":
    courses = root.courses
    for c in courses.values():
        c.printDetail()
    print()

    students = root.students
    for s in students.values():
        s.printTranscript()
        print()
