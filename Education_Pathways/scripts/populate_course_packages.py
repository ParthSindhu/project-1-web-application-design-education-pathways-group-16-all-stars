import requests

# Create a new course package


def create_course_package(courses, name, description):
    url = "https://education-pathways-allstars.herokuapp.com/packages"
    payload = {
        "courses": courses,
        "name": name,
        "description": description
    }
    response = requests.post(url, json=payload)
    return response


print(create_course_package(
    courses=[
        "ECE318H1",
        "ECE444H1",
        "ECE445H1",
        "ECE446H1",
    ],
    name="Demo Package",
    description="This is a demo package"
))
