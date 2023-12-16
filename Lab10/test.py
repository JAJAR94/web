import requests

name = "Post3"
surname = "4534543"
id = "12323953045"

def post1(name,surname,id):
    url =  'http://161.246.5.61:11353/students/newForm/?student_name=' + name + '&student_surname=' + surname + '&student_id=' + id
    requests.post(url)

def post2():
    url = 'http://161.246.5.61:11353/students/new/' + name + '/' + surname + '/' + id
    requests.post(url)



def post3(name,surname,id):
    new_data = {
        "name" : name,
        "surname" : surname,
        "ID" : id

    }

    url = 'http://161.246.5.61:11353/students/new/'

    post_response = requests.post(url, json=new_data)

    post_response_json = post_response.json()
    print(post_response_json)
    print(post_response.text)

def requestAll():
    url = 'http://161.246.5.61:11353/students/html'
    response = requests.get(url)
    if response.status_code == 200:
        print('Request Successful')
        print('Response: ',response.text)
    else:
        print('Request failed. Status code: ',response.status_code)


def requestEach(student_id):
    url = 'http://161.246.5.61:11353/students/html/' + student_id
    response = requests.get(url)
    if response.status_code == 200:
        print('Request Successful')
        print('Response: ',response.text)
    else:
        print('Request failed. Status code: ',response.status_code)

# student_id = input("type input: ")
requestAll()
# requestEach("12323953045")
# post3("name1","surnam1","123")